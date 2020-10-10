import React, { FC, ReactElement } from 'react';
import {
  IconButton, Button, Toolbar, useMediaQuery, useTheme, styled,
} from '@material-ui/core';
import LeftIcon from '@material-ui/icons/ChevronLeftOutlined';
import RightIcon from '@material-ui/icons/ChevronRightOutlined';
import TodayIcon from '@material-ui/icons/TodayOutlined';
import { useTranslation } from 'react-i18next';
import { useSetTimesheetState, useTimesheetState } from 'contexts/timesheet';
import {
  addDays, endOfWeek, startOfWeek, subDays,
} from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import { WorktimeDatePicker } from '../worktime/WorktimeDatePicker';

// #region styles
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('xs')]: {
    flexDirection: 'column',
    minHeight: 'fit-content',
  },
}));
// #endregion

export const TimesheetToolbar: FC = (): ReactElement => {
  const { t } = useTranslation();
  const setTimesheetState = useSetTimesheetState();
  const { firstDay, lastDay, numOfDays } = useTimesheetState();
  const locale = useDateLocale();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <StyledToolbar>
      <div>
        <IconButton
          title={t('ui:tooltips.prev')}
          size="small"
          onClick={() => setTimesheetState({
            firstDay: subDays(firstDay, numOfDays),
            lastDay: subDays(lastDay, numOfDays),
          })}
        >
          <LeftIcon />
        </IconButton>

        <WorktimeDatePicker />

        <IconButton
          title={t('ui:tooltips.next')}
          size="small"
          onClick={() => setTimesheetState({
            firstDay: addDays(firstDay, numOfDays),
            lastDay: addDays(lastDay, numOfDays),
          })}
        >
          <RightIcon />
        </IconButton>
      </div>

      <span style={{ flex: 1 }} />

      <Button
        variant="outlined"
        onClick={() => setTimesheetState({
          firstDay: startOfWeek(new Date(), { locale }),
          lastDay: endOfWeek(new Date(), { locale }),
        })}
        startIcon={!isMobile ? <TodayIcon /> : null}
      >
        {t('ui:timesheet.today')}
      </Button>
    </StyledToolbar>
  );
};
