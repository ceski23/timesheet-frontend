import React, { FC } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import {
  addHours,
} from 'date-fns';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { errorHandler2, formErrorHandler } from 'utils/errorHandlers';
import { ApiError } from 'utils/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddRecordIcon from '@material-ui/icons/AlarmAddOutlined';
import { AddRecordParams, useAddRecord } from 'api/records';
import { set } from 'date-fns/esm';
import { AddRecordForm } from './AddRecordForm';
import { addRecordSchema } from './schema';

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

export const AddRecordDialog: FC<Props> = ({ isOpen, setClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [addRecord] = useAddRecord();
  const { t } = useTranslation();

  const addRecordForm = useForm<AddRecordParams>({
    defaultValues: {
      dateFrom: set(new Date(), { seconds: 0, milliseconds: 0 }),
      dateTo: addHours(set(new Date(), { seconds: 0, milliseconds: 0 }), 1),
      details: '',
      type: 'normal',
    },
    resolver: yupResolver(addRecordSchema),
  });

  const handleSubmit = async (values: AddRecordParams) => {
    await addRecord(values, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.record_added'));
        setClose();
      },
      onError: error => {
        formErrorHandler(error, addRecordForm.setError, e => {
          switch (e) {
            case 'Dates should not overlap': return t('ui:notifications.failure.records_overlap');
            default: return t('ui:notifications.failure.add_record');
          }
        });
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setClose()}
      aria-labelledby="add-record-dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogHeader>
        <StyledIcon icon={AddRecordIcon} color={theme.palette.primary.main} />
        <StyledTitle>{t('ui:add_record.title')}</StyledTitle>
        <IconButton onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <AddRecordForm onSubmit={handleSubmit} form={addRecordForm} />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
