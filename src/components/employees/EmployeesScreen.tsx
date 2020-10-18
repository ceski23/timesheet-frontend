/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, ChangeEvent, useState, useEffect,
} from 'react';
import {
  styled, ListItem, ListItemIcon,
  ListItemText, Avatar, ListItemSecondaryAction, IconButton,
  TextField, InputAdornment, Fab,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { useDialog } from 'hooks/useDialog';
import { gridSpacingVertical } from 'utils/styles';
import { useUsers, useDeleteUser, User, EditUserParams, ID } from 'api/users';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import { useDebounce } from 'use-lodash-debounce';
import Notificator from 'utils/Notificator';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { ConfirmDialog } from 'components/shared/ConfirmDialog';
import { SimpleList } from 'components/shared/SimpleList';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import { AddEmployeeDialog } from './add/AddEmployeeDialog';
import { EditEmployeeDialog } from './edit/EditEmployeeDialog';

// #region styles
const Container = styled('div')(({ theme }) => ({
  ...gridSpacingVertical(theme.spacing(2)),
  display: 'flex',
  flex: 1,
}));

const AddEmployeeButton = styled(Fab)({
  position: 'fixed',
  right: 32,
  bottom: 32,
});
// #endregion

export const EmployeesScreen: FC = (): ReactElement => {
  const { t } = useTranslation();
  const deleteEmployeeDialog = useDialog<User>();
  const addEmployeeDialog = useDialog<User>();
  const editEmployeeDialog = useDialog<EditUserParams & ID>();
  const [{ page, query }, setReqParams] = useState({
    page: 1,
    query: '',
  });
  const [tmpQuery, setTmpQuery] = useState(query);
  const debouncedQuery = useDebounce(tmpQuery, 500);
  const users = useUsers({ query, page, limit: 15 });
  const [deleteUser] = useDeleteUser();

  useEffect(() => {
    setReqParams({ page: 1, query: debouncedQuery });
  }, [debouncedQuery]);

  useEffect(() => {
    if (users.isError) Notificator.error(t('ui:notifications.failure.find_employees'));
  }, [users.isError]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setReqParams({ query, page: value });
  };

  const handleEmployeeDelete = async () => {
    // eslint-disable-next-line no-underscore-dangle
    await deleteUser(deleteEmployeeDialog.data?._id, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.employee_deleted', { name: deleteEmployeeDialog.data?.name }));
      },
      onError: () => {
        Notificator.error(t('ui:notifications.failure.delete_employee'));
      },
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTmpQuery(event.target.value);
  };

  return (
    <ScreenWrapper title={t('ui:employees.title')}>
      <Container>
        <SimpleList
          loading={users.isLoading}
          header={(
            <SimpleListHeader title={t('ui:employees.list_title')}>
              <TextField
                id="employees-searchbar"
                variant="outlined"
                size="small"
                value={tmpQuery}
                onChange={handleSearchChange}
                inputProps={{
                  'aria-label': t('ui:employees.searchbox'),
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder={t('ui:employees.searchbox')}
              />
            </SimpleListHeader>
          )}
          onPageChange={handlePageChange}
          pagination={{
            count: users.resolvedData?.totalPages,
            page: users.resolvedData?.currentPage,
          }}
        >
          {users.resolvedData?.data.map(({ name, email, ...rest }, i) => (
          // eslint-disable-next-line react/no-array-index-key
            <ListItem
              button
              key={i}
              onClick={() => editEmployeeDialog.setOpen({ name, email, id: rest._id })}
            >
              <ListItemIcon>
                <Avatar>{name[0]}</Avatar>
              </ListItemIcon>
              <ListItemText primary={name} secondary={email} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteEmployeeDialog.setOpen({ name, email, ...rest })}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </SimpleList>
      </Container>

      <AddEmployeeButton
        variant="extended"
        color="primary"
        onClick={() => addEmployeeDialog.setOpen()}
      >
        <AddEmployeeIcon style={{ marginRight: 8 }} />
        {t('ui:employees.add_button')}
      </AddEmployeeButton>

      <ConfirmDialog
        {...deleteEmployeeDialog}
        onConfirm={handleEmployeeDelete}
        confirmText={t('ui:delete_employee.confirm')}
        title={t('ui:delete_employee.title')}
      >
        {t('ui:delete_employee.text', { name: deleteEmployeeDialog.data?.name })}
      </ConfirmDialog>

      <AddEmployeeDialog {...addEmployeeDialog} />

      <EditEmployeeDialog {...editEmployeeDialog} />
    </ScreenWrapper>
  );
};
