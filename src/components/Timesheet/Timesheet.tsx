/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, useEffect,
} from 'react';
import { styled, Popover } from '@material-ui/core';
import { Header } from 'components/Timesheet/Header';
import { Content, Event } from 'components/Timesheet/Content';
import { useDialog } from 'hooks/useDialog';
import { TimesheetStateProvider, useSetTimesheetState, useTimesheetState } from 'contexts/timesheet';
import { endOfWeek, startOfWeek } from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import { TimesheetToolbar } from 'components/Timesheet/TimesheetToolbar';
import { EventInfo } from './EventInfo';

interface Props {
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

const TimesheetContent: FC<Props> = ({ events }): ReactElement => {
  // const { mousePos, selectedEvent } = useSelector(selectWorktimeState);
  const { isOpen, setOpen, setClose } = useDialog();
  const setTimesheetState = useSetTimesheetState();
  const locale = useDateLocale();
  const { selectedEvent, mousePos } = useTimesheetState();

  useEffect(() => {
    setTimesheetState({
      firstDay: startOfWeek(new Date(), { locale }),
      lastDay: endOfWeek(new Date(), { locale }),
    });
  }, []);

  useEffect(() => {
    if (selectedEvent) setOpen();
  }, [selectedEvent]);

  return (
    <Container>
      <Header />

      <Content events={events} />

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
        anchorPosition={{ left: mousePos?.x || 0, top: mousePos?.y || 0 }}
      >
        {selectedEvent && <EventInfo event={selectedEvent} close={setClose} />}
      </Popover>
    </Container>
  );
};

export const Timesheet: FC<Props> = props => (
  <TimesheetStateProvider>
    <TimesheetToolbar />
    <TimesheetContent {...props} />
  </TimesheetStateProvider>
);
