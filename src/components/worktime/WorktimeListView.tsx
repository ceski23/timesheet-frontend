/* eslint-disable react/jsx-props-no-spreading */
import { styled } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
/* eslint-disable no-underscore-dangle */
import { Record, UpdateRecordParams, usePaginatedRecords } from 'api/records';
import { User } from 'api/users';
import { SimpleList } from 'components/shared/SimpleList';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import {
  startOfWeek, startOfDay, endOfWeek, endOfDay,
} from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import { DialogHook } from 'hooks/useDialog';
import React, {
  ChangeEvent, FC, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { RecordListItem } from './RecordListItem';

// #region styles
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: theme.spacing(2),
}));
// #endregion

interface Props {
  deleteDialog: DialogHook<Record>;
  editDialog: DialogHook<UpdateRecordParams>;
  user?: User;
}

export const WorktimeListView: FC<Props> = ({ deleteDialog, editDialog, user }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const locale = useDateLocale();

  const [{ dateFrom, dateTo }, setRange] = useState({
    dateFrom: startOfWeek(startOfDay(new Date()), { locale }),
    dateTo: endOfWeek(endOfDay(new Date()), { locale }),
  });

  const records = usePaginatedRecords({
    page, dateFrom, dateTo, userId: user?._id,
  });

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeDateFrom = (date: MaterialUiPickersDate) => {
    if (date) setRange({ dateFrom: date, dateTo });
  };

  const handleChangeDateTo = (date: MaterialUiPickersDate) => {
    if (date) setRange({ dateFrom, dateTo: date });
  };

  return (
    <Container>
      <SimpleList
        loading={records.isLoading}
        header={(
          <SimpleListHeader title={t('ui:records.list_title')}>
            <DatePicker
              label={t('form:fields.date_from')}
              margin="dense"
              autoOk
              required
              format="dd.MM.yyyy"
              inputVariant="outlined"
              value={dateFrom}
              onChange={handleChangeDateFrom}
              style={{ marginRight: 16 }}
            />
            <DatePicker
              label={t('form:fields.date_to')}
              margin="dense"
              autoOk
              required
              format="dd.MM.yyyy"
              inputVariant="outlined"
              value={dateTo}
              onChange={handleChangeDateTo}
            />
          </SimpleListHeader>
      )}
        onPageChange={handlePageChange}
        pagination={{
          count: records.resolvedData?.totalPages,
          page: records.resolvedData?.currentPage,
        }}
      >
        {records.resolvedData?.data.map(record => (
          <RecordListItem
          // eslint-disable-next-line no-underscore-dangle
            key={record._id}
            data={record}
            onDelete={() => deleteDialog.setOpen(record)}
            onClick={() => editDialog.setOpen({
              dateFrom: new Date(record.dateFrom),
              dateTo: new Date(record.dateTo),
              type: record.type,
              details: record.details,
              id: record._id,
            })}
          />
        ))}
      </SimpleList>
    </Container>
  );
};
