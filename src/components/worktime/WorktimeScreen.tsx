/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import { Timesheet } from 'components/Timesheet/Timesheet';
import {
  startOfDay, parse, startOfWeek, endOfWeek, endOfDay,
} from 'date-fns';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { useRecords, useRemoveRecord, Record } from 'api/records';
import { useDateLocale } from 'hooks/useDateFormatter';
import { useAppState } from 'contexts/appState';
import AddRecordIcon from '@material-ui/icons/AlarmAddOutlined';
import { Fab, styled } from '@material-ui/core';
import { SimpleList } from 'components/shared/SimpleList';
import { SimpleListHeader } from 'components/shared/SimpleListHeader';
import { ConfirmDialog } from 'components/shared/ConfirmDialog';
import { useDialog } from 'hooks/useDialog';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { WorktimeToolbar } from './WorktimeToolbar';
import { WorktimeListView } from './WorktimeListView';
import { WorktimeTimesheetView } from './WorktimeTimesheetView';

const AddRecordButton = styled(Fab)({
  position: 'absolute',
  right: 32,
  bottom: 32,
});

export const WorktimeScreen: FC = (): ReactElement => {
  useAppScreen('worktime');
  const { worktimeViewType } = useAppState();
  const deleteRecordDialog = useDialog<Record>();
  const [deleteRecord] = useRemoveRecord();
  const { t } = useTranslation();

  const handleRecordDelete = async () => {
    await deleteRecord(deleteRecordDialog.data?._id, {
      onSuccess: () => {
        Notificator.success(t('records.deleted'));
      },
      onError: () => {
        Notificator.error(t('records.deleteError'));
      },
    });
  };

  return (
    <ScreenWrapper toolbar={<WorktimeToolbar />}>
      {worktimeViewType === 'list' && (
        <WorktimeListView deleteDialog={deleteRecordDialog} />
      )}
      {worktimeViewType === 'timesheet' && (
        <WorktimeTimesheetView deleteDialog={deleteRecordDialog} />
      )}

      <AddRecordButton variant="extended" color="primary">
        <AddRecordIcon style={{ marginRight: 8 }} />
        Raportuj
      </AddRecordButton>

      <ConfirmDialog
        {...deleteRecordDialog}
        onConfirm={handleRecordDelete}
        confirmText={t('records.deleteDialog.confirm')}
        title={t('records.deleteDialog.title')}
      >
        {t('records.deleteDialog.text')}
      </ConfirmDialog>
    </ScreenWrapper>
  );
};
