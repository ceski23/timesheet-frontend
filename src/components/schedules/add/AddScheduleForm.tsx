import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion, AccordionDetails, AccordionSummary, Button, Chip,
  FormGroup, FormLabel, styled, TextField, Typography, withStyles,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MultiSelectDatePicker } from 'components/shared/MultiSelectDatePicker';
import { AddScheduleParams } from 'api/schedules';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  isSameDay, compareAsc, eachWeekendOfInterval,
} from 'date-fns';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { DangerButton } from 'components/shared/DangerButton';
import { filterUniqueDates } from 'utils/dates';
import {
  Controller, ErrorOption, SubmitHandler, UseFormMethods,
} from 'react-hook-form';
import { FormParams2 } from 'utils/types';

// #region styles
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const DayChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const DaysOffContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const StyledAccordion = withStyles({
  root: {
    '&::before': {
      content: 'none',
    },
  },
})(Accordion);

const DateRangeFormGroup = styled(FormGroup)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px',
  marginBottom: 48,
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: 'auto',
  },
}));

const DaysOffFormGroup = styled(FormGroup)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '16px',
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: 'auto',
  },
}));
// #endregion

// TODO: Add ranges validation
export const AddScheduleForm: FC<FormParams2<AddScheduleParams>> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const { format } = useDateFormatter();
  const [daysOffOpen, setOpen] = useState(false);
  const {
    register, handleSubmit, control, setValue,
    getValues, watch, formState, errors,
  } = form;
  const watchedDaysOff = watch('daysOff');
  const { isSubmitting } = formState;

  return (
  // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <FormLabel component="legend">Nazwa rozkładu</FormLabel>
      <TextField
        type="text"
        name="name"
        label={t('schedule.form.name')}
        style={{ marginBottom: 32 }}
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message || ''}
      />

      <FormLabel component="legend">Zakres rozkładu</FormLabel>
      <DateRangeFormGroup>
        <Controller
          control={control}
          name="fromDate"
          render={p => (
            <KeyboardDatePicker
              label="Początek"
              margin="normal"
              // onChange={(date: Date) => setFieldValue('fromDate', startOfDay(date))}
              autoOk
              format="dd.MM.yyyy"
              inputVariant="outlined"
              error={!!errors.fromDate}
              helperText={errors.fromDate?.message || ''}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...p}
            />
          )}
        />
        <Controller
          control={control}
          name="toDate"
          render={p => (
            <KeyboardDatePicker
              label="Koniec"
              margin="normal"
              // onChange={(date: Date) => setFieldValue('fromDate', startOfDay(date))}
              autoOk
              format="dd.MM.yyyy"
              inputVariant="outlined"
              error={!!errors.toDate}
              helperText={errors.toDate?.message || ''}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...p}
            />
          )}
        />
      </DateRangeFormGroup>

      <FormLabel component="legend" style={{ marginBottom: 16 }}>Dni wolne</FormLabel>
      <DaysOffFormGroup>
        <Controller
          control={control}
          name="daysOff"
          render={p => (
            <MultiSelectDatePicker
              minDate={getValues('fromDate')}
              maxDate={getValues('toDate')}
              error={!!errors.daysOff}
              helperText={errors.daysOff?.[0]?.message || 'lknjn'}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...p}
            />
          )}
        />

        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'stretch',
        }}
        >
          <Button
            variant="outlined"
            color="primary"
            style={{ marginBottom: 8 }}
            onClick={() => {
              const { fromDate, toDate, daysOff } = getValues();
              const weekends = eachWeekendOfInterval({
                start: fromDate, end: toDate,
              });

              setValue('daysOff', filterUniqueDates([...daysOff, ...weekends]).sort(compareAsc));
            }}
          >Dodaj soboty i niedziele w zakresie
          </Button>

          <Button
            variant="outlined"
            color="primary"
            disabled
            style={{ marginBottom: 8 }}
          >Dodaj z pliku iCal
          </Button>

          <DangerButton
            variant="outlined"
            color="primary"
            style={{ marginTop: 24 }}
            onClick={() => setValue('daysOff', [])}
          >Usuń wszystkie dni wolne
          </DangerButton>
        </div>
      </DaysOffFormGroup>

      <StyledAccordion
        expanded={daysOffOpen}
        onChange={() => setOpen(!daysOffOpen)}
        square
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>Dni wolne: <strong>{watchedDaysOff.length}</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DaysOffContainer>
            {watchedDaysOff.map(day => (
              <DayChip
                key={day.getTime()}
                label={format(day, 'dd MMM yyyy')}
                onDelete={() => setValue('daysOff', (
                  // eslint-disable-next-line max-len
                  watchedDaysOff.filter(selectedDay => !isSameDay(selectedDay, day))
                    .sort(compareAsc)
                ))}
              />
            ))}
          </DaysOffContainer>
        </AccordionDetails>
      </StyledAccordion>

      <SubmitButton
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? t('schedules.form.add.loading') : t('schedules.form.add.submit')}
      </SubmitButton>
    </StyledForm>
  );
};
