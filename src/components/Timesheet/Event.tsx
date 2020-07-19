import React, {
  FC, ReactElement,
} from 'react';
import {
  styled, Typography, ButtonBase,
} from '@material-ui/core';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { differenceInMinutes } from 'date-fns';
import { useAppTheme } from 'hooks/useAppTheme';
import { useThunkDispatch } from 'store';
import { openEventPopover } from 'store/worktime/slice';
import { Event as E } from './Content';

interface Props {
  interval: number;
  height: number;
  event: E;
}

const Container = styled('div')({
  paddingBottom: 4,
  paddingLeft: 4,
  paddingRight: 4,
  position: 'absolute',
  width: '100%',
});

const Info = styled(ButtonBase)({
  padding: 8,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: 4,
  textAlign: 'left',
});

const Title = styled(Typography)({
  fontSize: '0.75rem',
});

const Text = styled(Title)({
  marginTop: 4,
});

export const Event: FC<Props> = ({ interval, height, event }): ReactElement => {
  const {
    color, end, start, title,
  } = event;
  const { format } = useDateFormatter();
  const theme = useAppTheme();
  const offset = (((start.getHours() * 60) + start.getMinutes()) / interval) * height;
  const size = (differenceInMinutes(end, start) / interval) * height;
  const textColor = theme.palette.getContrastText(color ?? theme.palette.secondary.main);
  const dispatch = useThunkDispatch();

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.persist();
    const { clientX: x, pageY: y } = ev.nativeEvent;
    dispatch(openEventPopover({ mousePos: { x, y }, selectedEvent: event }));
  };

  return (
    <Container
      style={{ transform: `translate(0, ${offset}px)`, height: size }}
      onClick={handleClick}
    >
      <Info style={{ background: color ?? theme.palette.secondary.main }}>
        <Title
          variant="subtitle2"
          style={{ color: textColor }}
        >
          {title}
        </Title>

        <Text
          variant="body2"
          style={{ color: textColor }}
        >
          {format(start, 'p')} - {format(end, 'p')}
        </Text>
      </Info>
    </Container>
  );
};
