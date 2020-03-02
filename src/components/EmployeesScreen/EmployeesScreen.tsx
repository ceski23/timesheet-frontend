import React, {
  FC, ReactElement, useEffect,
} from 'react';
import {
  styled, Paper, List, ListItem, ListItemIcon,
  ListItemText, Grid, Avatar, CircularProgress,
} from '@material-ui/core';
import AllUsersIcon from '@material-ui/icons/AccountCircleOutlined';
import ActivatedIcon from '@material-ui/icons/CheckCircleOutlined';
import DeactivatedIcon from '@material-ui/icons/ErrorOutline';
import { useThunkDispatch } from 'store';
import {
  getUsers, setUsersFilter, changePage,
} from 'features/users/slice';
import { useSelector } from 'react-redux';
import {
  selectUsersPagination, selectUsersStatus, selectUsersData,
} from 'features/users/selectors';
import { UsersFilter } from 'features/users/types';
import Pagination from '@material-ui/lab/Pagination';
import { FilterChip } from 'components/FilterChip';
import { Loader } from 'components/Loader';
import { useTranslation } from 'react-i18next';

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

const UsersPagination = styled(Pagination)(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
  '& .MuiPagination-ul': {
    justifyContent: 'center',
  },
}));

const FiltersContainer = styled(Grid)(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
}));

export const EmployeesScreen: FC = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const { currentPage, totalPages } = useSelector(selectUsersPagination);
  const { loading } = useSelector(selectUsersStatus);
  const { filter: usersFilter, users, query: usersQuery } = useSelector(selectUsersData);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(changePage(1));
    dispatch(getUsers());
  }, [usersQuery]);

  const filters = [
    { filter: UsersFilter.ALL, icon: <AllUsersIcon />, label: t('employees.filters.all') },
    { filter: UsersFilter.ACTIVATED, icon: <ActivatedIcon />, label: t('employees.filters.activated') },
    { filter: UsersFilter.DEACTIVATED, icon: <DeactivatedIcon />, label: t('employees.filters.deactivated') },
  ];

  const handlePageChange = (_event: Event, value: number) => {
    dispatch(changePage(value));
    dispatch(getUsers());
  };

  const handleChangeActivatedFilter = (filter: UsersFilter) => {
    dispatch(setUsersFilter(filter));
    dispatch(changePage(1));
    dispatch(getUsers());
  };

  return (
    <Container>
      <FiltersContainer container spacing={2}>
        {filters.map(({ filter, icon, label }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item key={i}>
            <FilterChip
              enabled={usersFilter === filter}
              icon={icon}
              label={label}
              handleClick={() => handleChangeActivatedFilter(filter)}
            />
          </Grid>
        ))}
      </FiltersContainer>

      <UsersList>
        <Loader
          loading={loading}
          loader={(
            <SpinnerContainer>
              <CircularProgress />
            </SpinnerContainer>
          )}
        >
          {users.map(({ name, email }, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem button key={i}>
              <ListItemIcon>
                <Avatar>{name[0]}</Avatar>
              </ListItemIcon>
              <ListItemText primary={name} secondary={email} />
            </ListItem>
          ))}
        </Loader>
      </UsersList>

      <UsersPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />

    </Container>
  );
};
