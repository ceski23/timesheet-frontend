/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import { Fab, styled } from '@material-ui/core';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { SimpleList } from 'components/shared/SimpleList';
import React, { ChangeEvent, FC, useState } from 'react';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import { useTranslation } from 'react-i18next';
import {
  EditScheduleParams, Schedule, useRemoveSchedule, useSchedules,
} from 'api/schedules';
import AddScheduleIcon from '@material-ui/icons/TodayOutlined';
import { useDialog } from 'hooks/useDialog';
import { ConfirmDialog } from 'components/shared/ConfirmDialog';
import Notificator from 'utils/Notificator';
import { ScheduleListItem } from './ScheduleListItem';
import { AddScheduleDialog } from './add/AddScheduleDialog';
import { EditScheduleDialog } from './edit/EditScheduleDialog';

// #region styles
const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  margin: theme.spacing(2),
}));

const AddScheduleButton = styled(Fab)({
  position: 'absolute',
  right: 32,
  bottom: 32,
});
// #endregion

export const SchedulesScreen: FC = () => {
  const [page, setPage] = useState(1);
  const schedules = useSchedules({ page });
  const { t } = useTranslation();
  const addScheduleDialog = useDialog<Schedule>();
  const editScheduleDialog = useDialog<EditScheduleParams>();
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
            <SimpleListHeader title={t('ui:schedules.list_title')} />
          )}
          onPageChange={handlePageChange}
          pagination={{
            count: schedules.resolvedData?.totalPages,
            page: schedules.resolvedData?.currentPage,
          }}
        >
          {schedules.resolvedData?.data.map(schedule => (
            <ScheduleListItem
              key={schedule._id}
              data={schedule}
              onDelete={() => deleteScheduleDialog.setOpen(schedule)}
              onClick={() => editScheduleDialog.setOpen({
                daysOff: schedule.daysOff.map(day => new Date(day)),
                fromDate: new Date(schedule.fromDate),
                toDate: new Date(schedule.toDate),
                name: schedule.name,
                id: schedule._id,
              })}
            />
          ))}
        </SimpleList>

      </Container>

      <AddScheduleButton
        variant="extended"
        color="primary"
        onClick={() => addScheduleDialog.setOpen()}
      >
        <AddScheduleIcon style={{ marginRight: 8 }} />
        {t('ui:schedules.add_button')}
      </AddScheduleButton>

      <AddScheduleDialog {...addScheduleDialog} />

      <EditScheduleDialog {...editScheduleDialog} />

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
