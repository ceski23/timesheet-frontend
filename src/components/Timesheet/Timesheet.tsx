import React, { FC, ReactElement, useEffect } from 'react';
import { styled, Popover } from '@material-ui/core';
import { Header } from 'components/Timesheet/Header';
import { Content, Event } from 'components/Timesheet/Content';
import { useDialog } from 'hooks/useDialog';
import { selectWorktimeState, NumOfDays } from 'store/worktime/slice';
import { useSelector } from 'react-redux';
import { EventInfo } from './EventInfo';

interface Props {
  firstDate: Date;
  lastDate: Date;
  numOfDays?: NumOfDays;
  startTime?: Date;
  interval?: number;
  events: Event[];
}

// #region styles
const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 16,
  overflow: 'auto',
}));
// #endregion

export const Timesheet: FC<Props> = ({
  firstDate,
  lastDate,
  numOfDays = 7,
  startTime = new Date(0, 0, 0, 0, 0, 0),
  interval = 60,
  events,
}): ReactElement => {
  const { mousePos, selectedEvent } = useSelector(selectWorktimeState);
  const { isOpen, setOpen, setClose } = useDialog();

  useEffect(() => {
    if (selectedEvent) setOpen();
  }, [selectedEvent]);

  return (
    <Container>
      <Header
        firstDate={firstDate}
        lastDate={lastDate}
      />

      <Content
        startTime={startTime}
        interval={interval}
        numOfDays={numOfDays}
        events={events}
      />

      <Popover
        open={isOpen}
        onClose={setClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        anchorReference="anchorPosition"
        anchorPosition={{ left: mousePos.x, top: mousePos.y }}
      >
        {selectedEvent && <EventInfo event={selectedEvent} close={setClose} />}
      </Popover>
    </Container>
  );
};
