import { styled } from '@material-ui/core';
import { Calendar } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { compareAsc, startOfDay } from 'date-fns';
import isSameDay from 'date-fns/isSameDay';
import React, {
  Dispatch, FC,
} from 'react';
import { useTranslation } from 'react-i18next';

const Container = styled('div')({
  width: 280,
  overflow: 'hidden',
  margin: 'auto',
});

interface Props {
  value: Date[];
  onChange: Dispatch<Date[]>;
  minDate: Date;
  maxDate: Date;
  error?: boolean;
  helperText?: string;
}

export const MultiSelectDatePicker: FC<Props> = ({
  value, onChange, minDate, maxDate, ...props
}) => {
  const { t } = useTranslation();

  const handleDayClick = (day: MaterialUiPickersDate) => {
    const isSelected = value.find(selectedDay => isSameDay(day as Date, selectedDay));
    if (isSelected) {
      const x = value
        .filter(selectedDay => !isSameDay(selectedDay, day as Date))
        .sort(compareAsc);

      onChange(x);
    } else {
      const x = [...value, day as Date].sort(compareAsc);
      onChange(x);
    }
  };

  // TODO: Better optimize rendering calendar view
  const renderDay = (
    day: MaterialUiPickersDate, _selectedDate: MaterialUiPickersDate, _dayInCurrentMonth: boolean,
    dayComponent: JSX.Element,
  ) => {
    const isSelected = value.some(
      selectedDay => isSameDay(selectedDay, day as Date),
    );
    return React.cloneElement(dayComponent, { ...dayComponent.props, selected: isSelected });
  };

  return (
    <Container>
      <Calendar
        date={startOfDay(new Date())}
        onChange={handleDayClick}
        renderDay={renderDay}
        minDate={minDate}
        maxDate={maxDate}
        leftArrowButtonProps={{
          title: t('ui:tooltips.prev'),
        }}
        rightArrowButtonProps={{
          title: t('ui:tooltips.next'),
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Container>
  );
};
