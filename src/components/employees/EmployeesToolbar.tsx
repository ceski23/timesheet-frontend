import React, {
  FC, ReactElement, ChangeEvent, Dispatch,
} from 'react';
import {
  styled, TextField, InputAdornment, Typography, CircularProgress,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import { useTranslation } from 'react-i18next';
import { useIsFetching } from 'react-query';

// #region styles
const SearchBox = styled(TextField)(({ theme }) => ({
  margin: `0 ${theme.spacing(3)}px`,
}));

const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const Title = styled(Typography)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
});
// #endregion

interface Props {
  query: string;
  setQuery: Dispatch<string>;
}

export const EmployeesToolbar: FC<Props> = ({ query, setQuery }): ReactElement => {
  const { t } = useTranslation();
  const isFetching = useIsFetching();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Title variant="h6">
        {t('employees.title')}
        {isFetching ? <StyledProgress size={24} /> : null}
      </Title>

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
