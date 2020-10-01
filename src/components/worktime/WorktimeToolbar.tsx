import React, { FC, ReactElement } from 'react';
import { IconButton, Button } from '@material-ui/core';
import LeftIcon from '@material-ui/icons/ChevronLeftOutlined';
import RightIcon from '@material-ui/icons/ChevronRightOutlined';
import TodayIcon from '@material-ui/icons/TodayOutlined';
import { useTranslation } from 'react-i18next';
import { WorktimeDatePicker } from './WorktimeDatePicker';

export const WorktimeToolbar: FC = (): ReactElement => {
  // const dispatch = useThunkDispatch();
  const { t } = useTranslation();

  return (
    <>
      {/* <IconButton size="small" onClick={() => dispatch(prevDays())}>
        <LeftIcon />
      </IconButton> */}

      <WorktimeDatePicker />

      {/* <IconButton size="small" onClick={() => dispatch(nextDays())}>
        <RightIcon />
      </IconButton> */}

      <span style={{ flex: 1 }} />

      <Button
        variant="outlined"
        // onClick={() => dispatch(nowDay())}
        startIcon={<TodayIcon />}
      >
        {t('worktime.toolbar.today')}
      </Button>
    </>
  );
};
