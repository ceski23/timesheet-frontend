import React, { FC, ReactElement } from 'react';
import { IconButton, Button } from '@material-ui/core';
import LeftIcon from '@material-ui/icons/ChevronLeftOutlined';
import RightIcon from '@material-ui/icons/ChevronRightOutlined';
import { prevDays, nextDays, nowDay } from 'features/worktime/slice';
import { useThunkDispatch } from 'store';
import TodayIcon from '@material-ui/icons/TodayOutlined';
import { WorktimeDatePicker } from 'components/WorktimeDatePicker';
import { useTranslation } from 'react-i18next';

export const WorktimeToolbar: FC = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation();

  return (
    <>
      <IconButton size="small" onClick={() => dispatch(prevDays())}>
        <LeftIcon />
      </IconButton>

      <WorktimeDatePicker />

      <IconButton size="small" onClick={() => dispatch(nextDays())}>
        <RightIcon />
      </IconButton>

      <span style={{ flex: 1 }} />

      <Button
        variant="outlined"
        onClick={() => dispatch(nowDay())}
        startIcon={<TodayIcon />}
      >
        {t('worktime.toolbar.today')}
      </Button>
    </>
  );
};
