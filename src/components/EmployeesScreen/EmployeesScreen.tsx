import React, {
  FC, ReactElement, useEffect, ChangeEvent,
} from 'react';
import {
  styled, Paper, List, ListItem, ListItemIcon,
  ListItemText, Avatar, CircularProgress, ListItemSecondaryAction, IconButton, withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useThunkDispatch } from 'store';
import { useSelector } from 'react-redux';
import { User } from 'store/users/types';
import Pagination from '@material-ui/lab/Pagination';
import { Loader } from 'components/Loader';
import { useTranslation } from 'react-i18next';
import { setScreen } from 'store/appState/slice';
import { useDialog } from 'hooks/useDialog';
import { ConfirmDialog } from 'components/ConfirmDialog';
import Notificator from 'utils/Notificator';
import {
  fetchUsers, selectUsersData, selectUsersStatus,
  selectUsersPagination, selectUsersQuery, removeUser,
} from 'store/users/slice';

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const SpinnerContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
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

// const FiltersContainer = styled(Grid)(({ theme }) => ({
//   margin: `${theme.spacing(1)}px 0`,
// }));

export const EmployeesScreen: FC = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const query = useSelector(selectUsersQuery);
  const users = useSelector(selectUsersData);
  const { fetching } = useSelector(selectUsersStatus);
  const { currentPage, totalPages } = useSelector(selectUsersPagination);

  const { t } = useTranslation();
  const {
    isOpen, setClose, setOpen, data,
  } = useDialog<User>();

  useEffect(() => {
    dispatch(setScreen('employees'));
  }, []);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, query })).catch(() => Notificator.error(t('employees.findError')));
  }, [query]);

  // const filters = [
  //   { filter: UsersFilter.ALL, icon: <AllUsersIcon />, label: t('employees.filters.all') },
  // eslint-disable-next-line max-len
  //   { filter: UsersFilter.ACTIVATED, icon: <ActivatedIcon />, label: t('employees.filters.activated') },
  // eslint-disable-next-line max-len
  //   { filter: UsersFilter.DEACTIVATED, icon: <DeactivatedIcon />, label: t('employees.filters.deactivated') },
  // ];

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(fetchUsers({ page: value, query })).catch(() => Notificator.error(t('employees.findError')));
  };

  const handleEmployeeDelete = () => {
    if (data) {
      // eslint-disable-next-line no-underscore-dangle
      dispatch(removeUser(data._id))
        .then(() => Notificator.success(t('employees.employeeDeleted', { name: data.name })))
        .catch(() => Notificator.error(t('employees.deleteError')))
        .then(() => dispatch(fetchUsers({ page: 1, query })));
    }
  };

  return (
    <Container>
      {/* <FiltersContainer container spacing={2}>
        {filters.map(({ filter, icon, label }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item key={i}>
            <FilterChip
              // enabled={usersFilter === filter}
              icon={icon}
              label={label}
              handleClick={() => handleChangeActivatedFilter(filter)}
            />
          </Grid>
        ))}
      </FiltersContainer> */}

      <UsersList>
        <Loader
          loading={fetching}
          loader={(
            <SpinnerContainer>
              <CircularProgress />
            </SpinnerContainer>
          )}
        >
          {users && users.map(({ name, email, ...rest }, i) => (
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
                  onClick={() => setOpen({ name, email, ...rest })}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </Loader>
      </UsersList>

      {currentPage && (
        <UsersPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}

      <ConfirmDialog
        isOpen={isOpen}
        onConfirm={handleEmployeeDelete}
        confirmText={t('employees.deleteDialog.confirm')}
        title={t('employees.deleteDialog.title')}
        close={setClose}
      >
        {t('employees.deleteDialog.text', { name: data?.name })}
      </ConfirmDialog>

    </Container>
  );
};
