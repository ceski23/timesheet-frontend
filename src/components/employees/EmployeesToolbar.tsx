import React, {
  FC, ReactElement, useState, ChangeEvent, useEffect,
} from 'react';
import {
  styled, TextField, InputAdornment, Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { useThunkDispatch } from 'store';
import { useDebounce } from 'use-lodash-debounce';
import { useTranslation } from 'react-i18next';
import { setUsersQuery } from 'store/users/slice';

// #region styles
const SearchBox = styled(TextField)(({ theme }) => ({
  margin: `0 ${theme.spacing(3)}px`,
}));
// #endregion

export const EmployeesToolbar: FC = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 700);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setUsersQuery(debouncedQuery || undefined));
  }, [debouncedQuery]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Typography variant="h6" style={{ flex: 1 }}>
        {t('employees.title')}
      </Typography>

      <SearchBox
        variant="outlined"
        size="small"
        value={query}
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
    </>
  );
};