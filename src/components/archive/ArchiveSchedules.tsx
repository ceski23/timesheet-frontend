/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Paper, styled, TextField, Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useDebounce } from 'use-lodash-debounce';
import { Schedule, useSchedules } from 'api/schedules';
import fileDownload from 'js-file-download';
import { archiveSchedules } from 'api/archive';
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

export const ArchiveSchedules = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const schedules = useSchedules({ query: debouncedQuery });
  const [selectedSchedules, setSelected] = useState<Schedule[]>([]);
  const [error, setError] = useState('');

  const handleUserChange = (_event: ChangeEvent<{}>, selected: Schedule[] | null) => {
    setSelected(selected || []);
    setError('');
  };

  const handleQueryChange = (_event: ChangeEvent<{}>, value: string) => {
    setQuery(value);
  };

  const handleExportEmployees = async () => {
    if (selectedSchedules.length === 0) setError(t('ui:archive.schedules.required'));
    else {
      try {
        const data = await archiveSchedules(selectedSchedules.map(e => e._id));
        fileDownload(data, 'schedules.csv');
        setSelected([]);
      } catch (err) {
        Notificator.error(t('ui:notifications.failure.archive'));
      }
    }
  };

  return (
    <Container>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        {t('ui:archive.schedules.title')}
      </Typography>

      <FieldsWrapper>
        <Autocomplete
          multiple
          id="archive-schedules"
          options={schedules.resolvedData?.data || []}
          getOptionLabel={option => option.name}
          getOptionSelected={(option, value) => option.name === value.name}
          filterSelectedOptions
          onChange={handleUserChange}
          onInputChange={handleQueryChange}
          loading={schedules.isFetching}
          value={selectedSchedules}
          loadingText={t('ui:archive.loading')}
          noOptionsText={t('ui:archive.no_options')}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label={t('ui:archive.schedules.label')}
              placeholder={t('ui:archive.schedules.placeholder')}
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
