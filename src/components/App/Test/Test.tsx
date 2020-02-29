import React, {
  FC, ReactElement, useEffect, useState, ChangeEvent,
} from 'react';
import {
  styled, Paper, List, ListItem, ListItemIcon,
  ListItemText, Typography, Chip, Grid, Avatar, TextField, InputAdornment, CircularProgress,
} from '@material-ui/core';
import AllUsersIcon from '@material-ui/icons/AccountCircleOutlined';
import ActivatedIcon from '@material-ui/icons/CheckCircleOutlined';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import DeactivatedIcon from '@material-ui/icons/ErrorOutline';
import { useThunkDispatch } from 'store';
import {
  getUsers, setUsersFilter, changePage, setUsersQuery,
} from 'features/users/slice';
import { useSelector } from 'react-redux';
import {
  selectUsersPagination, selectUsersStatus, selectUsersData,
} from 'features/users/selectors';
import { UsersFilter } from 'features/users/types';
import Pagination from '@material-ui/lab/Pagination';
import { useDebounce } from 'use-lodash-debounce';

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  height: 500,
  display: 'flex',
  flexDirection: 'column',
}));

const SpinnerContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const UsersList = styled(List)(() => ({
  overflow: 'auto',
  flex: 1,
}));

const UsersPagination = styled(Pagination)(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
}));

const FiltersContainer = styled(Grid)(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
}));

const SearchBox = styled(TextField)(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
}));

interface FilterProps {
  enabled?: boolean;
  label: string;
  handleClick: () => void;
  icon: ReactElement;
}

const Filter: FC<FilterProps> = ({
  enabled, handleClick, label, icon,
}): ReactElement => (
  <Chip
    color={enabled ? 'primary' : 'default'}
    icon={icon}
    label={label}
    onClick={handleClick}
    variant="outlined"
  />
);

export const Test: FC = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const [query, setQuery] = useState('');
  const { currentPage, totalPages } = useSelector(selectUsersPagination);
  const { loading } = useSelector(selectUsersStatus);
  const { filter: usersFilter, users, query: usersQuery } = useSelector(selectUsersData);
  const debouncedQuery = useDebounce(query, 700);

  useEffect(() => {
    dispatch(setUsersQuery(debouncedQuery || undefined));
  }, [debouncedQuery]);

  useEffect(() => {
    dispatch(changePage(1));
    dispatch(getUsers());
  }, [usersQuery]);

  const filters = [
    { filter: UsersFilter.ALL, icon: <AllUsersIcon />, label: 'Wszyscy' },
    { filter: UsersFilter.ACTIVATED, icon: <ActivatedIcon />, label: 'Aktywowani' },
    { filter: UsersFilter.DEACTIVATED, icon: <DeactivatedIcon />, label: 'Nie aktywowani' },
  ];

  const handlePageChange = (_event: Event, value: number) => {
    dispatch(changePage(value));
    dispatch(getUsers());
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChangeActivatedFilter = (filter: UsersFilter) => {
    dispatch(setUsersFilter(filter));
    dispatch(changePage(1));
    dispatch(getUsers());
  };

  return (
    <Container>
      <Typography gutterBottom variant="h6">Użytkownicy</Typography>

      <SearchBox
        variant="outlined"
        size="small"
        fullWidth
        value={query}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Wpisz nazwę..."
      />

      <FiltersContainer container spacing={2}>
        {filters.map(({ filter, icon, label }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item key={i}>
            <Filter
              enabled={usersFilter === filter}
              icon={icon}
              label={label}
              handleClick={() => handleChangeActivatedFilter(filter)}
            />
          </Grid>
        ))}
      </FiltersContainer>

      <UsersList>
        {loading
          ? (
            <SpinnerContainer>
              <CircularProgress />
            </SpinnerContainer>
          )
          : users.map(({ name, email }, i) => (
          // eslint-disable-next-line react/no-array-index-key
            <ListItem button key={i}>
              <ListItemIcon>
                <Avatar>{name[0]}</Avatar>
              </ListItemIcon>
              <ListItemText primary={name} secondary={email} />
            </ListItem>
          ))}
      </UsersList>

      <UsersPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />

    </Container>
  );
};
