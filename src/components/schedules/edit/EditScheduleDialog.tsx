import React, { FC, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import AddScheduleIcon from '@material-ui/icons/TodayOutlined';
import { AddScheduleParams, EditScheduleParams, useEditSchedule } from 'api/schedules';
import { endOfMonth, startOfMonth, startOfToday } from 'date-fns';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { errorHandler2, formErrorHandler } from 'utils/errorHandlers';
import { ApiError } from 'utils/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addScheduleSchema } from '../add/schema';
import { AddScheduleForm } from '../add/AddScheduleForm';

// #region styles
const DialogHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: theme.spacing(3),
}));

const StyledIcon = styled(ColoredIcon)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(-1),
}));

const StyledTitle = styled(DialogTitle)({
  flex: 1,
});
// #endregion

interface Props {
  isOpen: boolean;
  setClose: () => void;
  data?: EditScheduleParams;
}

export const EditScheduleDialog: FC<Props> = ({ isOpen, setClose, data }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [editSchedule] = useEditSchedule();
  const { t } = useTranslation();

  const form = useForm<AddScheduleParams>({
    defaultValues: {
      fromDate: startOfMonth(startOfToday()),
      toDate: endOfMonth(startOfToday()),
      daysOff: [],
      name: '',
    },
    resolver: yupResolver(addScheduleSchema),
  });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = data;
      form.reset(rest);
    }
  }, [data]);

  const handleSubmit = async (values: AddScheduleParams) => {
    if (data) {
      await editSchedule({ ...values, id: data.id }, {
        onSuccess: schedule => {
          Notificator.success(t('ui:notifications.success.schedule_edited', { name: schedule.name }));
          setClose();
        },
        onError: error => {
          formErrorHandler(error, form.setError, e => {
            switch (e) {
              case 'Dates should not overlap': return t('ui:notifications.failure.schedules_overlap');
              default: return t('ui:notifications.failure.update_schedule');
            }
          });
        },
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setClose()}
      aria-labelledby="add-employee-dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogHeader>
        <StyledIcon icon={AddScheduleIcon} color={theme.palette.primary.main} />
        <StyledTitle>{t('ui:edit_schedule.title')}</StyledTitle>
        <IconButton title={t('ui:navigation.close')} onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <DialogContent>
        <AddScheduleForm onSubmit={handleSubmit} form={form} />
      </DialogContent>

      <DialogActions />

    </Dialog>
  );
};
