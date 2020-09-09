import React, { FC, ReactElement } from 'react';
import {
  styled, Button, Typography, Popover,
} from '@material-ui/core';
import { useDialog } from 'hooks/useDialog';
import { DatePicker } from '@material-ui/pickers';
import { useDateFormatter, getDateLocale } from 'hooks/useDateFormatter';
import { useSelector } from 'react-redux';
import { selectWorktimeState, setDays, getFirstDate } from 'store/worktime/slice';
import { useThunkDispatch } from 'store';
import { usePreferences } from 'contexts/preferences';

// #region styles
const Container = styled(Button)({
  margin: '0 8px',
  textTransform: 'initial',
});
// #endregion

export const WorktimeDatePicker: FC = (): ReactElement => {
  const { format } = useDateFormatter();
  const { firstDay, lastDay, numOfDays } = useSelector(selectWorktimeState);
  const { language } = usePreferences();
  const {
    isOpen, setClose, setOpen, data,
  } = useDialog<Element>();
  const dispatch = useThunkDispatch();

  const handleDateClick = (event: React.MouseEvent) => {
    setOpen(event.currentTarget);
  };

  const handleDateSelect = (date: Date | null) => {
    setClose();
    if (date) {
      const firstDate = getFirstDate(numOfDays, getDateLocale(language), date);
      dispatch(setDays(firstDate));
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
