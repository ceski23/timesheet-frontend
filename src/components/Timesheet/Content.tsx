import React, { FC, ReactElement, useMemo } from 'react';
import { styled, Typography } from '@material-ui/core';
import {
  add, getTime, isWithinInterval, startOfDay,
} from 'date-fns';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { useTimesheetState } from 'contexts/timesheet';
import { Day } from './Day';

interface Pos {
  x: number;
  y: number;
}

export type NumOfDays = 1 | 3 | 7;

export interface WorktimeState {
  numOfDays: NumOfDays;
  firstDay: Date;
  lastDay: Date;
  selectedEvent?: Event;
  mousePos: Pos;
}

export interface Event {
  title: string;
  start: Date;
  end: Date;
  color?: string;
  desc: string;
}

interface Props {
  interval?: number;
  events: Event[];
}

const CELL_HEIGHT = 48;

// #region styles
const Times = styled('div')({
  display: 'grid',
  gridTemplateRows: 'repeat(24, 1fr)',
  width: 100,
  transform: `translate(0, -${CELL_HEIGHT / 2}px)`,
});

const Time = styled(Typography)(({ theme }) => ({
  boxSizing: 'border-box',
  height: CELL_HEIGHT,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.primary,
}));

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  marginTop: 8,
  marginRight: 16,
});

const Grid = styled('div')({
  display: 'grid',
  flex: 1,
});
// #endregion

export const Content: FC<Props> = ({
  interval = 60, events,
}): ReactElement => {
  const { format } = useDateFormatter();
  const { firstDay, lastDay, numOfDays } = useTimesheetState();

  const visibleEvents = useMemo(() => (
    events.filter(e => isWithinInterval(e.start, {
      start: firstDay,
      end: lastDay,
    }))
  ), [firstDay, lastDay]);

  const times = Array.from({ length: 24 * (60 / interval) }).map((_n, i) => (
    add(startOfDay(new Date()), { minutes: i * interval })
  ));

  return (
    <Container>
      <Times style={{ gridTemplateRows: `repeat(${times.length}, 1fr)` }}>
        {times.map(time => (
          <Time
            color="textSecondary"
            variant="caption"
            key={getTime(time)}
          >{format(time, 'p')}
          </Time>
        ))}
      </Times>

      <Grid style={{ gridTemplateColumns: `repeat(${numOfDays}, 1fr)` }}>
        {Array.from({ length: numOfDays }).map((_n, i) => (
          <Day
          // eslint-disable-next-line react/no-array-index-key
            key={i}
            times={times}
            height={CELL_HEIGHT}
            events={visibleEvents.filter(e => e.start.getDay() === i + 1)}
            interval={interval}
          />
        ))}
      </Grid>
    </Container>
  );
};
