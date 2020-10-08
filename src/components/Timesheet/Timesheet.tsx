/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, useEffect,
} from 'react';
import { styled, Popover } from '@material-ui/core';
import { Header } from 'components/Timesheet/Header';
import { Content } from 'components/Timesheet/Content';
import { DialogHook, useDialog } from 'hooks/useDialog';
import { TimesheetStateProvider, useSetTimesheetState, useTimesheetState } from 'contexts/timesheet';
import { TimesheetToolbar } from 'components/Timesheet/TimesheetToolbar';
import { Record, useRecords } from 'api/records';
import {
  startOfWeek, startOfDay, endOfWeek, endOfDay,
} from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import { EventInfo } from './EventInfo';

interface Props {
  interval?: number;
  deleteDialog: DialogHook<Record>;
}

// #region styles
const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 16,
  overflow: 'auto',
}));
// #endregion

const TimesheetContent: FC<Props> = ({ deleteDialog }): ReactElement => {
  const { isOpen, setOpen, setClose } = useDialog();
  const setTimesheetState = useSetTimesheetState();
  const {
    selectedEvent, mousePos, firstDay, lastDay,
  } = useTimesheetState();
  const locale = useDateLocale();
  const records = useRecords({ dateFrom: firstDay, dateTo: lastDay });

  useEffect(() => {
    if (selectedEvent) setOpen();
  }, [selectedEvent]);

  useEffect(() => {
    setTimesheetState({
      firstDay: startOfWeek(startOfDay(new Date()), { locale }),
      lastDay: endOfWeek(endOfDay(new Date()), { locale }),
      deleteDialog,
    });
  }, []);

  return (
    <Container>
      <Header />

      <Content records={records.data || []} />

      <Popover
        open={isOpen}
        onClose={() => {
          setClose();
          setTimesheetState({ selectedEvent: undefined });
        }}
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
        {selectedEvent && (
        <EventInfo
          event={selectedEvent}
          close={() => {
            setClose();
            setTimesheetState({ selectedEvent: undefined });
          }}
        />
        )}
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
