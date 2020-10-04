import React, { FC } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { PrimaryIcon } from 'components/shared/PrimaryIcon';
import AddScheduleIcon from '@material-ui/icons/TodayOutlined';
import { FormSubmitFunction } from 'utils/types';
import { AddScheduleParams, useAddSchedule } from 'api/schedules';
import {
  endOfMonth, startOfMonth, startOfToday,
} from 'date-fns';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { errorHandler } from 'utils/errorHandlers';
import { ApiError } from 'utils/api';
import { AddScheduleForm } from './AddScheduleForm';

// #region styles
const StyledDialogContent = styled(DialogContent)({
  // minWidth: 600,
});

const DialogHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: theme.spacing(3),
}));

const StyledIcon = styled(PrimaryIcon)(({ theme }) => ({
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

  const handleSubmit: FormSubmitFunction<AddScheduleParams> = async (values, actions) => {
    await addSchedule(values, {
      onSuccess: schedule => {
        Notificator.success(t('schedules.scheduleAdded', { name: schedule.name }));
        actions.resetForm();
        setClose();
      },
      onError: error => {
        errorHandler(error as ApiError, actions.setErrors);
      },
    });
  };

  const initialValues = {
    fromDate: startOfMonth(startOfToday()),
    toDate: endOfMonth(startOfToday()),
    daysOff: [],
    name: '',
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
        <StyledIcon icon={AddScheduleIcon} />
        <StyledTitle>Dodawanie rozkładu</StyledTitle>
        <IconButton onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <AddScheduleForm handleSubmit={handleSubmit} initialValues={initialValues} />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
