import React, { FC, ReactElement } from 'react';
import { IconButton, Button, Toolbar } from '@material-ui/core';
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

export const TimesheetToolbar: FC = (): ReactElement => {
  // const dispatch = useThunkDispatch();
  const { t } = useTranslation();
  const setTimesheetState = useSetTimesheetState();
  const { firstDay, lastDay, numOfDays } = useTimesheetState();
  const locale = useDateLocale();

  return (
    <Toolbar>
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

      <span style={{ flex: 1 }} />

      <Button
        variant="outlined"
        onClick={() => setTimesheetState({
          firstDay: startOfWeek(new Date(), { locale }),
          lastDay: endOfWeek(new Date(), { locale }),
        })}
        startIcon={<TodayIcon />}
      >
        {t('ui:timesheet.today')}
      </Button>
    </Toolbar>
  );
};
