import React, { FC, ReactElement } from 'react';
import { styled, Paper } from '@material-ui/core';
import { add, getTime, differenceInDays } from 'date-fns';
import { useParentScroll } from 'hooks/useParentScroll';
import { HeaderCell } from './HeaderCell';

interface Props {
  firstDate: Date;
  lastDate: Date;
}

// eslint-disable-next-line react/jsx-props-no-spreading
const Container = styled(Paper)(({ theme }) => ({
  display: 'grid',
  paddingLeft: 100,
  position: 'sticky',
  top: 0,
  background: theme.palette.background.default,
  zIndex: 1,
  paddingRight: 16,
}));

export const Header: FC<Props> = ({ firstDate, lastDate }): ReactElement => {
  const { ref, position } = useParentScroll();
  const length = differenceInDays(lastDate, firstDate) + 1;

  const days = Array.from({ length }).map((_n, i) => (
    add(firstDate, { days: i })
  ));

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
