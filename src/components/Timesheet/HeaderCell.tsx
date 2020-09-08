import React, { FC, ReactElement } from 'react';
import { styled, Typography } from '@material-ui/core';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { isToday } from 'date-fns';
import { useAppTheme } from 'hooks/useAppTheme';

interface Props {
  date: Date;
}

// #region styles
const Container = styled('div')({
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: 10,
});
// #endregion

export const HeaderCell: FC<Props> = ({ date }): ReactElement => {
  const { format } = useDateFormatter();
  const theme = useAppTheme();
  const textColor = isToday(date) ? theme.palette.primary.main : theme.palette.text.secondary;

  return (
    <Container style={{ color: textColor }}>
      <Typography variant="body2">
        {format(date, 'EEE')}
      </Typography>
      <Typography variant="h5">
        {format(date, 'd')}
      </Typography>
    </Container>
  );
};
