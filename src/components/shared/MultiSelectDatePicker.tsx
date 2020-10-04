import { styled } from '@material-ui/core';
import { Calendar } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { compareAsc, startOfDay } from 'date-fns';
import isSameDay from 'date-fns/isSameDay';
import React, {
  Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo,
} from 'react';

const Container = styled('div')({
  width: 280,
  overflow: 'hidden',
  margin: 'auto',
});

interface Props {
  selectedDays: Date[];
  setSelectedDays: Dispatch<SetStateAction<Date[]>>;
  minDate: Date;
  maxDate: Date;
}

export const MultiSelectDatePicker: FC<Props> = ({
  selectedDays, setSelectedDays, minDate, maxDate,
}) => {
  const handleDayClick = (day: MaterialUiPickersDate) => {
    const isSelected = selectedDays.find(selectedDay => isSameDay(day as Date, selectedDay));
    console.log('1111111111111111111111111');
    if (isSelected) {
      const x = selectedDays
        .filter(selectedDay => !isSameDay(selectedDay, day as Date))
        .sort(compareAsc);

      setSelectedDays(x);
    } else {
      const x = [...selectedDays, day as Date].sort(compareAsc);
      setSelectedDays(x);
    }
  };

  console.log('MultiSelectDatePicker', selectedDays);

  // const renderDay = (
  //   day: MaterialUiPickersDate, _selectedDate: MaterialUiPickersDate, _dayInCurrentMonth
  // : boolean,
  //   dayComponent: JSX.Element,
  // ) => {
  //   console.log('22222222222222222222222222222222222');
  //   const isSelected = selectedDays.some(
  //     selectedDay => isSameDay(selectedDay, day as Date),
  //   );
  //   return React.cloneElement(dayComponent, { ...dayComponent.props, selected: isSelected });
  // };

  // const rd = useCallback(renderDay, [selectedDays]);

  return (
    <Container>
      <Calendar
        date={startOfDay(new Date())}
        onChange={handleDayClick}
        // renderDay={rd}
        minDate={minDate}
        maxDate={maxDate}
      />
    </Container>
  );
};
