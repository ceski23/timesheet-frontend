/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, styled,
} from '@material-ui/core';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { SimpleList } from 'components/shared/SimpleList';
import React, { ChangeEvent, FC, useState } from 'react';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import { useTranslation } from 'react-i18next';
import { Schedule, useRemoveSchedule, useSchedules } from 'api/schedules';
import AddScheduleIcon from '@material-ui/icons/TodayOutlined';
import { useDialog } from 'hooks/useDialog';
import { ConfirmDialog } from 'components/shared/ConfirmDialog';
import Notificator from 'utils/Notificator';
import { ScheduleListItem } from './ScheduleListItem';
import { AddScheduleDialog } from './add/AddScheduleDialog';

// #region styles
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: theme.spacing(2),
}));
// #endregion

export const SchedulesScreen: FC = () => {
  const [page, setPage] = useState(1);
  const schedules = useSchedules({ page });
  const { t } = useTranslation();
  const addScheduleDialog = useDialog<Schedule>();
  const deleteScheduleDialog = useDialog<Schedule>();
  const [deleteSchedule] = useRemoveSchedule();

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleScheduleDelete = async () => {
    await deleteSchedule(deleteScheduleDialog.data?._id, {
      onSuccess: () => {
        Notificator.success(t('schedules.deleted', { name: deleteScheduleDialog.data?.name }));
      },
      onError: () => {
        Notificator.error(t('schedules.deleteError'));
      },
    });
  };

  return (
    <ScreenWrapper title={t('schedules.title')}>
      <Container>

        <SimpleList
          loading={schedules.isLoading}
          header={(
            <SimpleListHeader title={t('schedules.list')}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddScheduleIcon />}
                onClick={() => addScheduleDialog.setOpen()}
              >
                Dodaj
              </Button>
            </SimpleListHeader>
          )}
          onPageChange={handlePageChange}
          pagination={{
            count: schedules.resolvedData?.totalPages,
            page: schedules.resolvedData?.currentPage,
          }}
        >
          {schedules.resolvedData?.data.map(schedule => (
            <ScheduleListItem
            // eslint-disable-next-line no-underscore-dangle
              key={schedule._id}
              data={schedule}
              onDelete={() => deleteScheduleDialog.setOpen(schedule)}
            />
          ))}
        </SimpleList>

      </Container>

      <AddScheduleDialog {...addScheduleDialog} />

      <ConfirmDialog
        {...deleteScheduleDialog}
        onConfirm={handleScheduleDelete}
        confirmText={t('schedules.deleteDialog.confirm')}
        title={t('schedules.deleteDialog.title')}
      >
        {t('schedules.deleteDialog.text', { name: deleteScheduleDialog.data?.name })}
      </ConfirmDialog>
    </ScreenWrapper>
  );
};
