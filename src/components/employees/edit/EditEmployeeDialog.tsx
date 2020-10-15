import React, { FC, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton,
} from '@material-ui/core';
import { ApiError } from 'utils/api';
import { errorHandler2 } from 'utils/errorHandlers';
import Notificator from 'utils/Notificator';
import { EditUserParams, useEditUser } from 'api/users';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addEmployeeSchema } from '../add/schema';
import { AddEmployeeForm } from '../add/AddEmployeeForm';

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
  data?: EditUserParams & { id: string };
}

export const EditEmployeeDialog: FC<Props> = ({
  isOpen, setClose, data,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const [editUser] = useEditUser();

  const editEmployeeForm = useForm<EditUserParams>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: yupResolver(addEmployeeSchema),
  });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = data;
      editEmployeeForm.reset(rest);
    }
  }, [data]);

  const handleSubmit = async (values: EditUserParams) => {
    if (data) {
      await editUser({ id: data.id, ...values }, {
        onSuccess: user => {
          Notificator.success(t('ui:notifications.success.employee_edited', { name: user.name }));
          editEmployeeForm.reset();
          setClose();
        },
        onError: error => {
          errorHandler2(error as ApiError, editEmployeeForm.setError);
        },
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setClose()}
      aria-labelledby="edit-employee-dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogHeader>
        <StyledIcon icon={AddEmployeeIcon} color={theme.palette.primary.main} />
        <StyledTitle>{t('ui:edit_employee.title')}</StyledTitle>
        <IconButton title={t('ui:navigation.close')} onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <AddEmployeeForm onSubmit={handleSubmit} form={editEmployeeForm} />
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
