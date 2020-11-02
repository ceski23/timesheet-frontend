/* eslint-disable no-underscore-dangle */
import React, {
  FC, ReactElement,
} from 'react';
import {
  styled, Typography, ButtonBase,
} from '@material-ui/core';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { differenceInMinutes } from 'date-fns';
import { useAppTheme } from 'hooks/useAppTheme';
import { useSetTimesheetState } from 'contexts/timesheet';
import { Record } from 'api/records';
import { useTranslation } from 'react-i18next';
import { getRecordData } from 'utils/records';

interface Props {
  interval: number;
  height: number;
  event: Record;
}

// #region styles
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
// #endregion

export const Event: FC<Props> = ({ interval, height, event }): ReactElement => {
  const { dateFrom, dateTo, type } = event;
  const theme = useAppTheme();
  const { t } = useTranslation();
  const { format } = useDateFormatter();
  const offset = ((
    (new Date(dateFrom).getHours() * 60) + new Date(dateFrom).getMinutes()
  ) / interval) * height;
  const { color } = getRecordData(event.type);
  const size = (differenceInMinutes(new Date(dateTo), new Date(dateFrom)) / interval) * height;
  const textColor = theme.palette.getContrastText(color);
  const setTimesheetState = useSetTimesheetState();

  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    ev.persist();
    const { clientX: x, pageY: y } = ev.nativeEvent;
    setTimesheetState({
      mousePos: { x, y }, selectedEvent: event._id,
    });
  };

  return (
    <Container
      style={{ transform: `translate(0, ${offset}px)`, height: size }}
      onClick={handleClick}
    >
      <Info style={{ background: color ?? theme.palette.secondary.main }}>
        <Typography
          variant="subtitle2"
          style={{ color: textColor, fontSize: '0.75rem' }}
          component="p"
        >
          {t(`ui:records.type.${type}`)}
        </Typography>

        <Text
          variant="body2"
          style={{ color: textColor }}
        >
          {format(new Date(dateFrom), 'p')} - {format(new Date(dateTo), 'p')}
        </Text>
      </Info>
    </Container>
  );
};
