import React, {
  FC, ReactElement,
} from 'react';
import {
  styled, Typography, CircularProgress, Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useIsFetching } from 'react-query';
import TimesheetViewIcon from '@material-ui/icons/ViewWeekOutlined';
import ListViewIcon from '@material-ui/icons/ViewHeadlineOutlined';
import { useAppState, useSetAppState } from 'contexts/appState';

// #region styles
const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const Title = styled(Typography)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
});
// #endregion

export const WorktimeToolbar: FC = (): ReactElement => {
  const { t } = useTranslation();
  const isFetching = useIsFetching();
  const setAppState = useSetAppState();
  const { worktimeViewType } = useAppState();

  return (
    <>
      <Title variant="h6">
        {t('ui:records.title')}
        {isFetching ? <StyledProgress size={24} /> : null}
      </Title>

      <div>
        {worktimeViewType === 'list' && (
          <Button
            startIcon={<TimesheetViewIcon />}
            onClick={() => setAppState({ worktimeViewType: 'timesheet' })}
          >
            {t('ui:records.timesheet_view')}
          </Button>
        )}
        {worktimeViewType === 'timesheet' && (
          <Button
            startIcon={<ListViewIcon />}
            onClick={() => setAppState({ worktimeViewType: 'list' })}
          >
            {t('ui:records.list_view')}
          </Button>
        )}
      </div>
    </>
  );
};
