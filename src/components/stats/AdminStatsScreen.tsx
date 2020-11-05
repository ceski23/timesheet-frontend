/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar, Divider, styled, TextField, Typography,
} from '@material-ui/core';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { DatePicker } from '@material-ui/pickers';
import { SimpleList } from 'components/shared/SimpleList';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { RECORD_TYPES } from 'api/records';
import {
  startOfWeek, startOfDay, endOfWeek, endOfDay,
} from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import { useEmployeesStats } from 'api/stats';
import { useDebounce } from 'use-lodash-debounce';
import { User, useUsers } from 'api/users';
import { Autocomplete } from '@material-ui/lab';
import {
  DataGrid, RowsProp, ColDef, ValueFormatterParams, GridOverlay,
} from '@material-ui/data-grid';

// #region styles
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: theme.spacing(2),
}));

const UserItem = styled('div')({
  display: 'grid',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'center',
  gridTemplateColumns: 'auto auto',
});

const Grid = styled(DataGrid)({
  borderRadius: 0,
});

const FilterActions = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr auto auto',
  margin: '0 16px 16px',
  gap: '16px',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto auto',
  },
}));
// #endregion

export const AdminStatsScreen = () => {
  const { t } = useTranslation();
  const locale = useDateLocale();
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

  const [{ dateFrom, dateTo }, setRange] = useState({
    dateFrom: startOfWeek(startOfDay(new Date()), { locale }),
    dateTo: endOfWeek(endOfDay(new Date()), { locale }),
  });

  const stats = useEmployeesStats({
    dateFrom, dateTo, id: selectedEmployees.map(e => e._id),
  }, { enabled: selectedEmployees.length > 0 });

  const columns: ColDef[] = useMemo(() => [
    {
      headerName: t('form:fields.name'),
      field: 'user',
      width: 180,
      renderCell: (params: ValueFormatterParams) => (
        <UserItem>
          <Avatar>{(params.value as User).name[0]}</Avatar>
          <Typography>{(params.value as User).name}</Typography>
        </UserItem>
      ),
      sortComparator: (user1, user2) => (
        (user1 as User).name.localeCompare((user2 as User).name)
      ),
    },
    ...RECORD_TYPES.map(type => ({
      headerName: t(`ui:records.type.${type}`),
      field: type,
      width: 180,
      valueFormatter: (params: ValueFormatterParams) => (
        t('ui:extra.hours', { count: ((params.value as number) || 0) })
      ),
      type: 'number',
    })),
    {
      headerName: t('ui:stats.overtime'),
      field: 'overtime',
      width: 130,
      valueFormatter: (params: ValueFormatterParams) => (
        t('ui:extra.hours', { count: ((params.value as number) || 0) })
      ),
      type: 'number',
    },
    {
      headerName: t('ui:stats.missing_days'),
      field: 'missingDays',
      width: 130,
      valueFormatter: (params: ValueFormatterParams) => (
        t('ui:extra.days', { count: ((params.value as number) || 0) })
      ),
      type: 'number',
    },
  ], [t]);

  const rows: RowsProp = useMemo(() => (
    (stats.data || []).map(d => ({ ...d, id: d._id, ...d.hours }))
  ), [stats.data]);

  const handleChangeDateFrom = (date: MaterialUiPickersDate) => {
    if (date) setRange({ dateFrom: date, dateTo });
  };

  const handleChangeDateTo = (date: MaterialUiPickersDate) => {
    if (date) setRange({ dateFrom, dateTo: date });
  };

  return (
    <ScreenWrapper title={t('ui:stats.title')}>
      <Container>
        <SimpleList
          loading={stats.isLoading}
          style={{ minHeight: 300 }}
          header={(
            <>
              <FilterActions>
                <Autocomplete
                  multiple
                  id="stats-employees"
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
                  style={{ gridColumn: '1 / 3' }}
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

                <DatePicker
                  id="stats-list-datefrom"
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
                  id="stats-list-dateto"
                  label={t('form:fields.date_to')}
                  autoOk
                  required
                  format="dd.MM.yyyy"
                  inputVariant="outlined"
                  value={dateTo}
                  onChange={handleChangeDateTo}
                  minDate={dateFrom}
                />
              </FilterActions>
              <Divider />
            </>
          )}
        >
          <Grid
            rows={rows}
            columns={columns}
            hideFooter
            components={{
              noRowsOverlay: () => (
                <GridOverlay>{t('ui:stats.no_results')}</GridOverlay>
              ),
            }}
          />
        </SimpleList>
      </Container>
    </ScreenWrapper>
  );
};
