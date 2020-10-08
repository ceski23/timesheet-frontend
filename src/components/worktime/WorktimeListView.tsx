/* eslint-disable react/jsx-props-no-spreading */
import { styled } from '@material-ui/core';
/* eslint-disable no-underscore-dangle */
import { Record, UpdateRecordParams, usePaginatedRecords } from 'api/records';
import { SimpleList } from 'components/shared/SimpleList';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import {
  startOfWeek, startOfDay, endOfWeek, endOfDay,
} from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import { DialogHook, useDialog } from 'hooks/useDialog';
import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EditRecordDialog } from './edit/EditRecordDialog';
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
}

export const WorktimeListView: FC<Props> = ({ deleteDialog, editDialog }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const locale = useDateLocale();
  const [dateFrom] = useState(startOfWeek(startOfDay(new Date()), { locale }));
  const [dateTo] = useState(endOfWeek(endOfDay(new Date()), { locale }));
  const records = usePaginatedRecords({ page, dateFrom, dateTo });

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <SimpleList
        loading={records.isLoading}
        header={(
          <SimpleListHeader title={t('ui:records.list_title')} />
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
