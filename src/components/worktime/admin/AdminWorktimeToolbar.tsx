import React, { FC, ReactElement } from 'react';
import {
  styled, Typography, CircularProgress, Avatar,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useIsFetching } from 'react-query';
import TimesheetViewIcon from '@material-ui/icons/ViewWeekOutlined';
import ListViewIcon from '@material-ui/icons/ViewHeadlineOutlined';
import { useAppState, useSetAppState } from 'contexts/appState';
import { User } from 'api/users';
import { ResponsiveIconButton } from 'components/shared/ResponsiveIconButton';

// #region styles
const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)({
  width: 32,
  height: 32,
  marginRight: 16,
});
// #endregion

interface Props {
  user?: User;
}

export const AdminWorktimeToolbar: FC<Props> = ({ user }): ReactElement => {
  const { t } = useTranslation();
  const isFetching = useIsFetching();
  const setAppState = useSetAppState();
  const { worktimeViewType } = useAppState();

  return (
    <>
      <Typography
        variant="h6"
        component="h1"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {user && <StyledAvatar>{user.name[0]}</StyledAvatar>}
        {user?.name || t('ui:records.title')}
        {isFetching ? <StyledProgress size={24} /> : null}
      </Typography>

      {user && (
        <div>
          {worktimeViewType === 'list' && (
          <ResponsiveIconButton
            icon={<TimesheetViewIcon />}
            onClick={() => setAppState({ worktimeViewType: 'timesheet' })}
          >
            {t('ui:records.timesheet_view')}
          </ResponsiveIconButton>
          )}
          {worktimeViewType === 'timesheet' && (
          <ResponsiveIconButton
            icon={<ListViewIcon />}
            onClick={() => setAppState({ worktimeViewType: 'list' })}
          >
            {t('ui:records.list_view')}
          </ResponsiveIconButton>
          )}
        </div>
      )}
    </>
  );
};
