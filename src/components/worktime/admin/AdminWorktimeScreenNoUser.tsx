/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  ChangeEvent,
  FC, ReactElement, useState,
} from 'react';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import {
  CircularProgress,
  FormLabel, Paper, styled, TextField,
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router';
import { Autocomplete } from '@material-ui/lab';
import { User, useUsers } from 'api/users';
import { useDebounce } from 'use-lodash-debounce';
import { reverse } from 'named-urls';
import { routeUrls } from 'routes';
import { useTranslation } from 'react-i18next';
import { AdminWorktimeToolbar } from './AdminWorktimeToolbar';

// #region styles

const Container = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  margin: 16,
});

// #endregion

export const AdminWorktimeScreenNoUser: FC<RouteComponentProps> = ({ history }): ReactElement => {
  useAppScreen('worktime');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const users = useUsers({ query: debouncedQuery });
  const { t } = useTranslation();

  const handleUserChange = (_event: ChangeEvent<{}>, user: User | null) => {
    if (user) {
      history.push(reverse(String(routeUrls.adminWorktime.user), { userId: user._id }));
    }
  };

  const handleQueryChange = (_event: ChangeEvent<{}>, value: string) => {
    setQuery(value);
  };

  return (
    <ScreenWrapper toolbar={<AdminWorktimeToolbar />}>
      <Container>
        <FormLabel component="legend">{t('ui:admin_worktime.select_user')}:</FormLabel>

        <Autocomplete
          style={{ minWidth: 200, marginTop: 16 }}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={handleUserChange}
          onInputChange={handleQueryChange}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={option => option.name}
          options={users.resolvedData?.data || []}
          loading={users.isFetching}
          loadingText={t('ui:admin_worktime.loading')}
          noOptionsText={t('ui:admin_worktime.no_options')}
          renderInput={({ inputProps, ...params }) => (
            <TextField
              inputProps={{
                ...inputProps,
                'aria-label': t('ui:admin_worktime.select_user'),
              }}
              {...params}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {users.isFetching && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Container>
    </ScreenWrapper>
  );
};
