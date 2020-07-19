import React, { FC, ReactElement } from 'react';
import { styled, Typography } from '@material-ui/core';
import { add, getTime } from 'date-fns';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { NumOfDays } from 'store/worktime/slice';
import { Day } from './Day';

export interface Event {
  title: string;
  start: Date;
  end: Date;
  color?: string;
  desc: string;
}

interface Props {
  startTime: Date;
  interval: number;
  numOfDays: NumOfDays;
  events: Event[];
}

const CELL_HEIGHT = 48;

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

export const Content: FC<Props> = ({
  startTime, interval, numOfDays, events,
}): ReactElement => {
  const { format } = useDateFormatter();

  const times = Array.from({ length: 24 * (60 / interval) }).map((_n, i) => (
    add(startTime, { minutes: i * interval })
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
            events={events.filter(e => e.start.getDay() === i + 1)}
            interval={interval}
          />
        ))}
      </Grid>
    </Container>
  );
};
