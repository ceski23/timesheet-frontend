import React, { FC, ReactElement } from 'react';
import { styled } from '@material-ui/core';
import { getTime } from 'date-fns';
import { Record } from 'api/records';
import { Event } from './Event';

interface Props {
  times: Date[];
  height: number;
  records: Record[];
  interval: number;
}

// #region styles
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
// #endregion

export const Day: FC<Props> = ({
  times, height, records, interval,
}): ReactElement => (
  <Container style={{ gridTemplateRows: `repeat(${times.length}, 1fr)` }}>
    {times.map(time => (
      <Cell key={getTime(time)} style={{ height: `${height}` }} />
    ))}

    {records.map(record => (
      <Event
        key={getTime(new Date(record.dateFrom))}
        interval={interval}
        height={height}
        event={record}
      />
    ))}
  </Container>
);
