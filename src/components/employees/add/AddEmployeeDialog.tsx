import React, { FC } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import { ApiError } from 'utils/api';
import { formErrorHandler } from 'utils/errorHandlers';
import Notificator from 'utils/Notificator';
import { AddUserParams, useAddUser } from 'api/users';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddEmployeeForm } from './AddEmployeeForm';
import { addEmployeeSchema } from './schema';

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

export const AddEmployeeDialog: FC<Props> = ({
  isOpen, setClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const [addUser] = useAddUser();

  const addEmployeeForm = useForm<AddUserParams>({
    defaultValues: {
      name: '',
      email: '',
      norm: 8,
    },
    resolver: yupResolver(addEmployeeSchema),
  });

  const handleSubmit = async (values: AddUserParams) => {
    await addUser(values, {
      onSuccess: user => {
        Notificator.success(t('ui:notifications.success.employee_added', { name: user.name }));
        addEmployeeForm.reset();
        setClose();
      },
      onError: error => {
        formErrorHandler(error as ApiError, addEmployeeForm.setError, e => {
          if (e.includes('expected `email` to be unique')) return t('ui:add_employee.email_exist');
          return t('ui:notifications.failure.add_employee');
        });
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
        <StyledIcon icon={AddEmployeeIcon} color={theme.palette.primary.main} />
        <StyledTitle>{t('ui:add_employee.title')}</StyledTitle>
        <IconButton title={t('ui:navigation.close')} onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <AddEmployeeForm onSubmit={handleSubmit} form={addEmployeeForm} />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
