/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, useEffect,
} from 'react';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import {
  AddRecordParams,
  Record, UpdateRecordParams,
  useAddRecord,
  useApproveRecord,
  useDisapproveRecord,
  useRemoveRecordForUser, useUpdateRecordForUser,
} from 'api/records';
import { useAppState } from 'contexts/appState';
import AddRecordIcon from '@material-ui/icons/AlarmAddOutlined';
import {
  Fab, styled,
} from '@material-ui/core';
import { useDialog } from 'hooks/useDialog';
import { useTranslation } from 'react-i18next';
import { Timesheet } from 'components/Timesheet/Timesheet';
import { RouteComponentProps, useHistory } from 'react-router';
import { useUser } from 'api/users';
import { ConfirmDialog } from 'components/shared/ConfirmDialog';
import Notificator from 'utils/Notificator';
import { routeUrls } from 'routes';
import { WorktimeListView } from '../WorktimeListView';
import { AdminWorktimeToolbar } from './AdminWorktimeToolbar';
import { AddRecordDialog } from '../add/AddRecordDialog';
import { EditRecordDialog } from '../edit/EditRecordDialog';

// #region styles
const AddRecordButton = styled(Fab)({
  position: 'fixed',
  right: 32,
  bottom: 32,
});
// #endregion

interface RouteParams {
  userId: string;
}

export const AdminWorktimeScreen: FC<RouteComponentProps<RouteParams>> = ({
  match: { params },
}): ReactElement => {
  useAppScreen('worktime');
  const { worktimeViewType } = useAppState();
  const deleteRecordDialog = useDialog<Record>();
  const addRecordDialog = useDialog<AddRecordParams>();
  const editRecordDialog = useDialog<UpdateRecordParams>();
  const [deleteRecord] = useRemoveRecordForUser();
  const { t } = useTranslation();
  const user = useUser(params.userId);
  const addRecordMutation = useAddRecord();
  const editRecordMutation = useUpdateRecordForUser();
  const [approve] = useApproveRecord();
  const [disapprove] = useDisapproveRecord();
  const history = useHistory();

  useEffect(() => {
    if (user.isError) {
      Notificator.error(t('ui:notifications.failure.employee_not_found'));
      history.push(String(routeUrls.adminWorktime));
    }
  }, [user.isError]);

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

  const handleApproveRecord = async (id: string) => {
    await approve(id, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.record_approved'));
      },
      onError: () => {
        Notificator.error(t('ui:notifications.failure.approve_records'));
      },
    });
  };

  const handleDisapproveRecord = async (id: string) => {
    await disapprove(id, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.record_disapproved'));
      },
      onError: () => {
        Notificator.error(t('ui:notifications.failure.disapprove_records'));
      },
    });
  };

  return (
    <ScreenWrapper toolbar={<AdminWorktimeToolbar user={user.data} />}>
      {worktimeViewType === 'list' && (
        <WorktimeListView
          deleteDialog={deleteRecordDialog}
          editDialog={editRecordDialog}
          user={user.data}
          onApprove={handleApproveRecord}
          onDisapprove={handleDisapproveRecord}
        />
      )}
      {worktimeViewType === 'timesheet' && (
        <Timesheet
          deleteDialog={deleteRecordDialog}
          editDialog={editRecordDialog}
          user={user.data}
          onApprove={handleApproveRecord}
          onDisapprove={handleDisapproveRecord}
        />
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

      <AddRecordDialog {...addRecordDialog} mutation={addRecordMutation} user={user.data} />

      <EditRecordDialog {...editRecordDialog} mutation={editRecordMutation} />
    </ScreenWrapper>
  );
};
