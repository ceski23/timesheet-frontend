/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement,
} from 'react';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { useRemoveRecord, Record, AddRecordParams } from 'api/records';
import { useAppState } from 'contexts/appState';
import AddRecordIcon from '@material-ui/icons/AlarmAddOutlined';
import { Fab, styled } from '@material-ui/core';
import { ConfirmDialog } from 'components/shared/ConfirmDialog';
import { useDialog } from 'hooks/useDialog';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { WorktimeToolbar } from './WorktimeToolbar';
import { WorktimeListView } from './WorktimeListView';
import { WorktimeTimesheetView } from './WorktimeTimesheetView';
import { AddRecordDialog } from './add/AddRecordDialog';

const AddRecordButton = styled(Fab)({
  position: 'absolute',
  right: 32,
  bottom: 32,
});

export const WorktimeScreen: FC = (): ReactElement => {
  useAppScreen('worktime');
  const { worktimeViewType } = useAppState();
  const deleteRecordDialog = useDialog<Record>();
  const addRecordDialog = useDialog<AddRecordParams>();
  const [deleteRecord] = useRemoveRecord();
  const { t } = useTranslation();

  const handleRecordDelete = async () => {
    await deleteRecord(deleteRecordDialog.data?._id, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.record_deleted'));
      },
      onError: () => {
        Notificator.error(t('ui:notifications.failure.delete_record'));
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

      <AddRecordButton
        variant="extended"
        color="primary"
        onClick={() => addRecordDialog.setOpen()}
      >
        <AddRecordIcon style={{ marginRight: 8 }} />
        {t('ui:records.add_button')}
      </AddRecordButton>

      <ConfirmDialog
        {...deleteRecordDialog}
        onConfirm={handleRecordDelete}
        confirmText={t('ui:delete_record.confirm')}
        title={t('ui:delete_record.title')}
      >
        {t('ui:delete_record.text')}
      </ConfirmDialog>

      <AddRecordDialog {...addRecordDialog} />
    </ScreenWrapper>
  );
};
