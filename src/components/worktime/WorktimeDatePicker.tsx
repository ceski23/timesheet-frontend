import React, { FC, ReactElement } from 'react';
import {
  styled, Button, Typography, Popover,
} from '@material-ui/core';
import { useDialog } from 'hooks/useDialog';
import { DatePicker } from '@material-ui/pickers';
import { useDateFormatter, useDateLocale } from 'hooks/useDateFormatter';
import { useSetTimesheetState, useTimesheetState } from 'contexts/timesheet';
import { endOfWeek, startOfWeek } from 'date-fns';

// #region styles
const Container = styled(Button)({
  margin: '0 8px',
  textTransform: 'initial',
});
// #endregion

export const WorktimeDatePicker: FC = (): ReactElement => {
  const { format } = useDateFormatter();
  const { firstDay, lastDay } = useTimesheetState();
  const setTimesheetState = useSetTimesheetState();
  const locale = useDateLocale();
  const {
    isOpen, setClose, setOpen, data,
  } = useDialog<Element>();

  const handleDateClick = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleDateSelect = (date: Date | null) => {
    setClose();
    if (date) {
      setTimesheetState({
        firstDay: startOfWeek(date, { locale }),
        lastDay: endOfWeek(date, { locale }),
      });
    }
  };

  return (
    <>
      <Container onClick={handleDateClick}>
        <Typography variant="h6">
          {firstDay.getFullYear() === lastDay.getFullYear() ? (
            `${format(firstDay, 'd MMM')} - ${format(lastDay, 'd MMM')} ${format(lastDay, 'y')}`
          ) : (
            `${format(firstDay, 'd MMM y')} - ${format(lastDay, 'd MMM y')}`
          )}
        </Typography>
      </Container>

      <Popover
        open={isOpen}
        onClose={setClose}
        anchorEl={data}
      >
        <DatePicker
          variant="static"
          value={firstDay}
          onChange={handleDateSelect}
        />
      </Popover>
    </>
  );
};
