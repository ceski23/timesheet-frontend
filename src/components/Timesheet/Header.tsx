import React, {
  FC, ReactElement, useMemo,
} from 'react';
import { styled, Paper } from '@material-ui/core';
import {
  add, getTime, differenceInCalendarDays,
} from 'date-fns';
import { useParentScroll } from 'hooks/useParentScroll';
import { useTimesheetState } from 'contexts/timesheet';
import { HeaderCell } from './HeaderCell';

// #region styles
// eslint-disable-next-line react/jsx-props-no-spreading
const Container = styled(Paper)(({ theme }) => ({
  display: 'grid',
  paddingLeft: 100,
  position: 'sticky',
  top: 0,
  background: theme.palette.background.default,
  zIndex: 1,
  paddingRight: 16,
  minWidth: 800,
}));
// #endregion

export const Header: FC = (): ReactElement => {
  const { ref, position } = useParentScroll();
  const { firstDay, lastDay } = useTimesheetState();
  const length = differenceInCalendarDays(lastDay, firstDay) + 1;

  const days = useMemo(() => Array.from({ length }).map((_n, i) => (
    add(firstDay, { days: i })
  )), [firstDay, lastDay]);

  return (
    <Container
      ref={ref}
      square
      style={{ gridTemplateColumns: `repeat(${length}, 1fr)` }}
      elevation={position.y ? 1 : 0}
    >
      {days.map(day => (
        <HeaderCell key={getTime(day)} date={day} />
      ))}
    </Container>
  );
};
