/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, ChangeEvent, useState, useEffect,
} from 'react';
import {
  styled, Paper, List, ListItem, ListItemIcon,
  ListItemText, Avatar, ListItemSecondaryAction, IconButton,
  withStyles, Button, Typography, TextField, InputAdornment,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Pagination from '@material-ui/lab/Pagination';
import { Loader } from 'components/Loader';
import { useTranslation } from 'react-i18next';
import { useDialog } from 'hooks/useDialog';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { gridSpacingVertical } from 'utils/styles';
import { useUsers, useDeleteUser, User } from 'api/users';
import { ScreenWrapper } from 'components/ScreenWrapper';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import { useDebounce } from 'use-lodash-debounce';
import Notificator from 'utils/Notificator';
import SearchIcon from '@material-ui/icons/SearchOutlined';
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

const ListContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const UsersList = styled(List)(() => ({
  overflow: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const UsersPagination = styled(withStyles({
  ul: {
    justifyContent: 'center',
  },
})(Pagination))(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
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
    if (users.isError) Notificator.error(t('employees.findError'));
  }, [users.isError]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setReqParams({ query, page: value });
  };

  const handleEmployeeDelete = async () => {
    // eslint-disable-next-line no-underscore-dangle
    await deleteUser(deleteEmployeeDialog.data?._id, {
      onSuccess: () => {
        Notificator.success(t('employees.employeeDeleted', { name: deleteEmployeeDialog.data?.name }));
      },
      onError: () => {
        Notificator.error(t('employees.deleteError'));
      },
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTmpQuery(event.target.value);
  };

  return (
    <ScreenWrapper title="Pracownicy">
      <Container>
        <ListContainer>

          <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', alignItems: 'center', minHeight: 56 }}>
            <Typography variant="h6" style={{ flex: 1 }}>Lista pracowników</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>

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
                placeholder={t('employees.search')}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddEmployeeIcon />}
                onClick={() => addEmployeeDialog.setOpen()}
              >
                Dodaj
              </Button>
            </div>
          </div>

          <UsersList>
            <Loader loading={users.isLoading}>
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
            </Loader>
          </UsersList>

          {users.resolvedData?.currentPage && (
            <UsersPagination
              count={users.resolvedData?.totalPages}
              page={users.resolvedData?.currentPage}
              onChange={handlePageChange}
            />
          )}

          <ConfirmDialog
            {...deleteEmployeeDialog}
            onConfirm={handleEmployeeDelete}
            confirmText={t('employees.deleteDialog.confirm')}
            title={t('employees.deleteDialog.title')}
          >
            {t('employees.deleteDialog.text', { name: deleteEmployeeDialog.data?.name })}
          </ConfirmDialog>

          <AddEmployeeDialog {...addEmployeeDialog} />

        </ListContainer>
      </Container>
    </ScreenWrapper>
  );
};
