import React, { FC } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { format } from 'date-fns';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { formErrorHandler } from 'utils/errorHandlers';
import { useForm } from 'react-hook-form';
import { ApproveRecordsParams, useApproveRecords } from 'api/records';
import { User } from 'api/users';
import { useDateLocale } from 'hooks/useDateFormatter';
import ApproveIcon from '@material-ui/icons/DoneAllOutlined';
import { ApproveRecordsForm } from './ApproveRecordsForm';

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
  // mutation: MutationResultPair<Record, unknown, Approve
  // RecordsParams & { userId?: string }, unknown>;
  user?: User;
}

export const ApproveRecordsDialog: FC<Props> = ({
  isOpen, setClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const [approveRecords] = mutation;
  const [approveRecords] = useApproveRecords();
  const { t } = useTranslation();
  const locale = useDateLocale();

  const addRecordForm = useForm<ApproveRecordsParams>({
    defaultValues: {
      date: new Date(),
    },
  });

  const handleSubmit = async (values: ApproveRecordsParams) => {
    await approveRecords(values, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.records_approved', {
          date: format(values.date, 'LLLL yyyy', { locale }),
        }));
        setClose();
      },
      onError: error => {
        formErrorHandler(error, addRecordForm.setError, e => {
          switch (e) {
            default: return t('ui:notifications.failure.approve_records');
          }
        });
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setClose()}
      aria-labelledby="approve-records-dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogHeader>
        <StyledIcon icon={ApproveIcon} color={theme.palette.primary.main} />
        <StyledTitle>{t('ui:approve_records.title')}</StyledTitle>
        <IconButton onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <ApproveRecordsForm onSubmit={handleSubmit} form={addRecordForm} />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
