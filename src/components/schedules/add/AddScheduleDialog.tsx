import React, { FC } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import AddScheduleIcon from '@material-ui/icons/TodayOutlined';
import { AddScheduleParams, useAddSchedule } from 'api/schedules';
import {
  endOfMonth, startOfMonth, startOfToday,
} from 'date-fns';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { errorHandler2 } from 'utils/errorHandlers';
import { ApiError } from 'utils/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddScheduleForm } from './AddScheduleForm';
import { addScheduleSchema } from './schema';

// #region styles
const StyledDialogContent = styled(DialogContent)({
  // minWidth: 600,
});

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
}

export const AddScheduleDialog: FC<Props> = ({ isOpen, setClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [addSchedule] = useAddSchedule();
  const { t } = useTranslation();

  const addScheduleForm = useForm<AddScheduleParams>({
    defaultValues: {
      fromDate: startOfMonth(startOfToday()),
      toDate: endOfMonth(startOfToday()),
      daysOff: [],
      name: '',
    },
    resolver: yupResolver(addScheduleSchema),
  });

  const handleSubmit = async (values: AddScheduleParams) => {
    await addSchedule(values, {
      onSuccess: schedule => {
        Notificator.success(t('ui:notifications.success.schedule_added', { name: schedule.name }));
        setClose();
      },
      onError: error => {
        errorHandler2(error as ApiError, addScheduleForm.setError);
      },
    });
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
        <StyledTitle>{t('ui:add_schedule.title')}</StyledTitle>
        <IconButton title={t('ui:navigation.close')} onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <AddScheduleForm onSubmit={handleSubmit} form={addScheduleForm} />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
