import React, { FC } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import { AddUserParams } from 'store/users/types';
import { ApiError } from 'utils/api';
import { errorHandler } from 'utils/errorHandlers';
import Notificator from 'utils/Notificator';
import { FormSubmitFunction } from 'utils/types';
import { useAddUser } from 'api/users';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import { PrimaryIcon } from 'components/shared/PrimaryIcon';
import { AddEmployeeForm } from './AddEmployeeForm';

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

export const AddEmployeeDialog: FC<Props> = ({
  isOpen, setClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const [addUser] = useAddUser();

  const handleSubmit: FormSubmitFunction<AddUserParams> = async (values, actions) => {
    await addUser(values, {
      onSuccess: user => {
        Notificator.success(t('employees.employeeAdded', { name: user.name }));
        actions.resetForm();
        setClose();
      },
      onError: error => {
        errorHandler(error as ApiError, actions.setErrors);
      },
    });
  };

  const initialValues = {
    name: '',
    email: '',
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
        <StyledIcon icon={AddEmployeeIcon} />
        <StyledTitle>Dodawanie pracownika</StyledTitle>
        <IconButton onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <AddEmployeeForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
        />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
