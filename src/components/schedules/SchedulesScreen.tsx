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
        Notificator.success(t('ui:notifications.success.schedule_deleted', { name: deleteScheduleDialog.data?.name }));
      },
      onError: () => {
        Notificator.error(t('ui:notifications.failure.delete_schedule'));
      },
    });
  };

  return (
    <ScreenWrapper title={t('ui:schedules.title')}>
      <Container>

        <SimpleList
          loading={schedules.isLoading}
          header={(
            <SimpleListHeader title={t('ui:schedules.list_title')}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddScheduleIcon />}
                onClick={() => addScheduleDialog.setOpen()}
              >
                {t('ui:schedules.add_button')}
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
        confirmText={t('ui:delete_schedule.confirm')}
        title={t('ui:delete_schedule.title')}
      >
        {t('ui:delete_schedule.text', { name: deleteScheduleDialog.data?.name })}
      </ConfirmDialog>
    </ScreenWrapper>
  );
};
