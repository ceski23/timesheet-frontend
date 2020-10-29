/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Paper, styled, TextField, Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { User, useUsers } from 'api/users';
import { useDebounce } from 'use-lodash-debounce';
import { archiveEmployees } from 'api/archive';
import fileDownload from 'js-file-download';
import Notificator from 'utils/Notificator';

// #region styles
const FieldsWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '32px 16px',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const Container = styled(Paper)({
  margin: 16,
  padding: 16,
});

const DownloadButton = styled(Button)({
  maxHeight: 56,
});
// #endregion

export const ArchiveEmployees = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const employees = useUsers({ query: debouncedQuery });
  const [selectedEmployees, setSelected] = useState<User[]>([]);
  const [error, setError] = useState('');

  const handleUserChange = (_event: ChangeEvent<{}>, users: User[] | null) => {
    setSelected(users || []);
    setError('');
  };

  const handleQueryChange = (_event: ChangeEvent<{}>, value: string) => {
    setQuery(value);
  };

  const handleExportEmployees = async () => {
    if (selectedEmployees.length === 0) setError(t('ui:archive.employees.required'));
    else {
      try {
        const data = await archiveEmployees(selectedEmployees.map(e => e._id));
        fileDownload(data, 'employees.csv');
        setSelected([]);
      } catch (err) {
        Notificator.error(t('ui:notifications.failure.archive'));
      }
    }
  };

  return (
    <Container>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        {t('ui:archive.employees.title')}
      </Typography>

      <FieldsWrapper>
        <Autocomplete
          multiple
          id="archive-employees"
          options={employees.resolvedData?.data || []}
          getOptionLabel={option => option.name}
          getOptionSelected={(option, value) => option.name === value.name}
          filterSelectedOptions
          onChange={handleUserChange}
          onInputChange={handleQueryChange}
          loading={employees.isFetching}
          value={selectedEmployees}
          loadingText={t('ui:archive.loading')}
          noOptionsText={t('ui:archive.no_options')}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label={t('ui:archive.employees.label')}
              placeholder={t('ui:archive.employees.placeholder')}
              required
              helperText={error}
              error={!!error}
            />
          )}
        />

        <DownloadButton
          color="primary"
          variant="contained"
          onClick={handleExportEmployees}
        >
          {t('ui:archive.export')}
        </DownloadButton>
      </FieldsWrapper>
    </Container>
  );
};
