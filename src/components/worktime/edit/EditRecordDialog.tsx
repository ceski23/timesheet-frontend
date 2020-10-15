import React, { FC, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { formErrorHandler } from 'utils/errorHandlers';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddRecordIcon from '@material-ui/icons/AlarmAddOutlined';
import { AddRecordParams, UpdateRecordParams, Record } from 'api/records';
import { MutationResultPair } from 'react-query';
import { addRecordSchema } from '../add/schema';
import { AddRecordForm } from '../add/AddRecordForm';

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
  data?: UpdateRecordParams;
  mutation: MutationResultPair<Record, unknown, UpdateRecordParams, unknown>;
}

export const EditRecordDialog: FC<Props> = ({
  isOpen, setClose, data, mutation,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [updateRecord] = mutation;
  const { t } = useTranslation();

  const updateRecordForm = useForm<AddRecordParams>({
    resolver: yupResolver(addRecordSchema),
  });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = data;
      updateRecordForm.reset(rest);
    }
  }, [data]);

  const handleSubmit = async (values: AddRecordParams) => {
    if (data) {
      await updateRecord({ ...values, id: data.id }, {
        onSuccess: () => {
          Notificator.success(t('ui:notifications.success.record_updated'));
          setClose();
        },
        onError: error => {
          formErrorHandler(error, updateRecordForm.setError, e => {
            switch (e) {
              case 'Dates should not overlap': return t('ui:notifications.failure.records_overlap');
              default: return t('ui:notifications.failure.update_record');
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
      aria-labelledby="edit-record-dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogHeader>
        <StyledIcon icon={AddRecordIcon} color={theme.palette.primary.main} />
        <StyledTitle>{t('ui:update_record.title')}</StyledTitle>
        <IconButton title={t('ui:navigation.close')} onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <AddRecordForm onSubmit={handleSubmit} form={updateRecordForm} />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
