import React, { FC, ReactElement } from 'react';
import { styled } from '@material-ui/core';
import { getTime } from 'date-fns';
import { Event } from './Event';
import { Event as E } from './Content';

interface Props {
  times: Date[];
  height: number;
  events: E[];
  interval: number;
}

// eslint-disable-next-line react/jsx-props-no-spreading
const Cell = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRight: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  alignItems: 'center',
}));

// eslint-disable-next-line react/jsx-props-no-spreading
const Container = styled('div')(({ theme }) => ({
  display: 'grid',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:first-child': {
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
  position: 'relative',
}));

export const Day: FC<Props> = ({
  times, height, events, interval,
}): ReactElement => (
  <Container style={{ gridTemplateRows: `repeat(${times.length}, 1fr)` }}>
    {times.map(time => (
      <Cell key={getTime(time)} style={{ height: `${height}` }} />
    ))}

    {events.map(event => (
      <Event
        key={getTime(event.start)}
        interval={interval}
        height={height}
        event={event}
      />
    ))}
  </Container>
);
