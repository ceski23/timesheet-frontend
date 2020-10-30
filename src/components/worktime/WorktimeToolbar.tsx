import React, { FC, ReactElement } from 'react';
import { styled, Typography, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useIsFetching } from 'react-query';
import TimesheetViewIcon from '@material-ui/icons/ViewWeekOutlined';
import ListViewIcon from '@material-ui/icons/ViewHeadlineOutlined';
import ApproveIcon from '@material-ui/icons/DoneOutlined';
import { useAppState, useSetAppState } from 'contexts/appState';
import { ResponsiveIconButton } from 'components/shared/ResponsiveIconButton';
import { Helmet } from 'react-helmet';

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

interface Props {
  onApproveClick: () => void;
}

export const WorktimeToolbar: FC<Props> = ({ onApproveClick }): ReactElement => {
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

      <Helmet>
        <title>{t('ui:records.title')} — zarządzanie czasem pracy</title>
      </Helmet>

      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'auto auto' }}>
        <ResponsiveIconButton
          icon={<ApproveIcon />}
          onClick={onApproveClick}
        >
          {t('ui:records.approve')}
        </ResponsiveIconButton>

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
    </>
  );
};
