/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Paper, styled, TextField, Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useDebounce } from 'use-lodash-debounce';
import fileDownload from 'js-file-download';
import { archiveRecords, archiveRecordsPdf } from 'api/archive';
import Notificator from 'utils/Notificator';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
  startOfWeek, startOfDay, endOfWeek, endOfDay,
} from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import { fetchAllUsers, User, useUsers } from 'api/users';

// #region styles
const FieldsWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridTemplateRows: 'auto auto',
  gap: '32px 16px',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const RangeWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px 16px',
});

const Container = styled(Paper)({
  margin: 16,
  padding: 16,
});

const DownloadButton = styled(Button)({
  maxHeight: 56,
});

const SelectAllButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
// #endregion

export const ArchiveRecords = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const employees = useUsers({ query: debouncedQuery });
  const [selectedEmployees, setSelected] = useState<User[]>([]);
  const [error, setError] = useState('');
  const locale = useDateLocale();

  const [{ dateFrom, dateTo }, setRange] = useState({
    dateFrom: startOfWeek(startOfDay(new Date()), { locale }),
    dateTo: endOfWeek(endOfDay(new Date()), { locale }),
  });

  const handleUserChange = (_event: ChangeEvent<{}>, selected: User[] | null) => {
    setSelected(selected || []);
    setError('');
  };

  const handleQueryChange = (_event: ChangeEvent<{}>, value: string) => {
    setQuery(value);
  };

  const handleChangeDateFrom = (date: MaterialUiPickersDate) => {
    if (date) setRange({ dateFrom: date, dateTo });
  };

  const handleChangeDateTo = (date: MaterialUiPickersDate) => {
    if (date) setRange({ dateFrom, dateTo: date });
  };

  const handleExportEmployees = async () => {
    if (selectedEmployees.length === 0) setError(t('ui:archive.employees.required'));
    else {
      try {
        const data = await archiveRecords({
          id: selectedEmployees.map(e => e._id),
          dateFrom,
          dateTo,
        });
        fileDownload(data, 'records.csv');
        setSelected([]);
      } catch (err) {
        Notificator.error(t('ui:notifications.failure.archive'));
      }
    }
  };

  const handleExportEmployeesPdf = async () => {
    if (selectedEmployees.length === 0) setError(t('ui:archive.employees.required'));
    else {
      try {
        const data = await archiveRecordsPdf({
          id: selectedEmployees.map(e => e._id),
          dateFrom,
          dateTo,
        });
        fileDownload(data, 'records.pdf');
        setSelected([]);
      } catch (err) {
        Notificator.error(t('ui:notifications.failure.archive'));
      }
    }
  };

  const handleSelectAll = async () => {
    try {
      const allUsers = await fetchAllUsers();
      setSelected(allUsers);
    } catch (_e) {
      Notificator.error(t('ui:notifications.failure.find_employees'));
    }
  };

  return (
    <Container>
      <Typography variant="h6" style={{ marginBottom: 16 }}>
        {t('ui:archive.records.title')}
      </Typography>

      <FieldsWrapper>
        <Autocomplete
          multiple
          id="archive-records-employee"
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

        <RangeWrapper>
          <DatePicker
            id="records-list-datefrom"
            label={t('form:fields.date_from')}
            autoOk
            required
            format="dd.MM.yyyy"
            inputVariant="outlined"
            value={dateFrom}
            onChange={handleChangeDateFrom}
            maxDate={dateTo}
          />

          <DatePicker
            id="records-list-dateto"
            label={t('form:fields.date_to')}
            autoOk
            required
            format="dd.MM.yyyy"
            inputVariant="outlined"
            value={dateTo}
            onChange={handleChangeDateTo}
            minDate={dateFrom}
          />
        </RangeWrapper>

        <div>
          <SelectAllButton variant="outlined" onClick={handleSelectAll}>
            {t('ui:archive.records.select_all_employees')}
          </SelectAllButton>
        </div>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'auto auto' }}>
          <DownloadButton
            color="primary"
            variant="contained"
            onClick={handleExportEmployees}
          >
            {t('ui:archive.export')}
          </DownloadButton>

          <DownloadButton
            color="primary"
            variant="contained"
            onClick={handleExportEmployeesPdf}
          >
            {t('ui:archive.export_pdf')}
          </DownloadButton>
        </div>
      </FieldsWrapper>
    </Container>
  );
};
