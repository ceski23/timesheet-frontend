/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, ChangeEvent, useState, useEffect,
} from 'react';
import {
  styled, ListItem, ListItemIcon,
  ListItemText, Avatar, ListItemSecondaryAction, IconButton,
  Button, TextField, InputAdornment,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useTranslation } from 'react-i18next';
import { useDialog } from 'hooks/useDialog';
import { gridSpacingVertical } from 'utils/styles';
import { useUsers, useDeleteUser, User } from 'api/users';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import { useDebounce } from 'use-lodash-debounce';
import Notificator from 'utils/Notificator';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { ConfirmDialog } from 'components/shared/ConfirmDialog';
import { SimpleList } from 'components/shared/SimpleList';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import { AddEmployeeDialog } from './add/AddEmployeeDialog';

// #region styles
const Container = styled('div')(({ theme }) => ({
  ...gridSpacingVertical(theme.spacing(2)),
  display: 'flex',
  // flexDirection: 'column',
  flex: 1,
  // maxHeight: `calc(100% - ${theme.spacing(4)}px)`,
  // [theme.breakpoints.up('sm')]: {
  //   ...gridSpacingHorizontal(theme.spacing(2), true),
  //   flexDirection: 'row-reverse',
  // },
}));

const SearchBox = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(3),
}));
// #endregion

export const EmployeesScreen: FC = (): ReactElement => {
  const { t } = useTranslation();
  const deleteEmployeeDialog = useDialog<User>();
  const addEmployeeDialog = useDialog<User>();
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
              <SearchBox
                variant="outlined"
                size="small"
                value={tmpQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                placeholder={t('ui:employees.searchbox')}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddEmployeeIcon />}
                onClick={() => addEmployeeDialog.setOpen()}
              >
                {t('ui:employees.add_button')}
              </Button>
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
            <ListItem button key={i}>
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

      <ConfirmDialog
        {...deleteEmployeeDialog}
        onConfirm={handleEmployeeDelete}
        confirmText={t('ui:delete_employee.confirm')}
        title={t('ui:delete_employee.title')}
      >
        {t('ui:delete_employee.text', { name: deleteEmployeeDialog.data?.name })}
      </ConfirmDialog>

      <AddEmployeeDialog {...addEmployeeDialog} />
    </ScreenWrapper>
  );
};
