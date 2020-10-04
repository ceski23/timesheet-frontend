/* eslint-disable react/jsx-props-no-spreading */
import {
  Button, styled,
} from '@material-ui/core';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { SimpleList } from 'components/shared/SimpleList';
import React, { ChangeEvent, FC, useState } from 'react';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import { useTranslation } from 'react-i18next';
import { Schedule, useSchedules } from 'api/schedules';
import AddScheduleIcon from '@material-ui/icons/TodayOutlined';
import { useDialog } from 'hooks/useDialog';
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

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
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
            // eslint-disable-next-line no-underscore-dangle
            <ScheduleListItem key={schedule._id} data={schedule} />
          ))}
        </SimpleList>

      </Container>

      <AddScheduleDialog {...addScheduleDialog} />
    </ScreenWrapper>
  );
};
