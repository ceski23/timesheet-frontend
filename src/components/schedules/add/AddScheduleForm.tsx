import React, { FC, useState } from 'react';
import {
  Formik, Form, Field,
} from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Accordion, AccordionDetails, AccordionSummary, Button, Chip,
  FormGroup, FormLabel, styled, Typography, withStyles,
} from '@material-ui/core';
import { FormParams, Stylable } from 'utils/types';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { MultiSelectDatePicker } from 'components/shared/MultiSelectDatePicker';
import { AddScheduleParams } from 'api/schedules';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  isSameDay, compareAsc, startOfDay,
  eachWeekendOfInterval,
} from 'date-fns';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { DangerButton } from 'components/shared/DangerButton';
import { filterUniqueDates } from 'utils/dates';
import { TextField } from 'formik-material-ui';
import { FormField } from 'components/shared/FormField';

// #region styles
const StyledForm = styled(Form)({
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
export const AddScheduleForm: FC<FormParams<AddScheduleParams> & Stylable> = ({
  handleSubmit, initialValues, ...props
}) => {
  const { t } = useTranslation();
  const { format } = useDateFormatter();
  const [daysOffOpen, setOpen] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting, values, setFieldValue, handleBlur,
      }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledForm {...props}>
          <FormLabel component="legend">Nazwa rozkładu</FormLabel>
          <FormField
            type="text"
            name="name"
            label={t('schedule.form.name')}
            style={{ marginBottom: 32 }}
          />

          <FormLabel component="legend" style={{ marginBottom: 16 }}>Zakres rozkładu</FormLabel>
          <DateRangeFormGroup>
            <Field
              component={KeyboardDatePicker}
              label="Początek"
              // value={values.fromDate}
              // onChange={(date: Date) => setFieldValue('fromDate', startOfDay(date))}
              autoOk
              format="dd.MM.yyyy"
              inputVariant="outlined"
              // onBlur={handleBlur}
              name="fromDate"
            />
            <Field
              component={KeyboardDatePicker}
              format="dd.MM.yyyy"
              label="Koniec"
              // value={values.toDate}
              // onChange={(date: Date) => setFieldValue('toDate', startOfDay(date))}
              autoOk
              inputVariant="outlined"
              // onBlur={handleBlur}
              name="toDate"
            />
          </DateRangeFormGroup>

          <FormLabel component="legend" style={{ marginBottom: 16 }}>Dni wolne</FormLabel>
          <DaysOffFormGroup>
            <MultiSelectDatePicker
              selectedDays={values.daysOff}
              setSelectedDays={days => setFieldValue('daysOff', days)}
              minDate={values.fromDate}
              maxDate={values.toDate}
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
                  const weekends = eachWeekendOfInterval({
                    start: values.fromDate, end: values.toDate,
                  });

                  setFieldValue('daysOff', filterUniqueDates([...values.daysOff, ...weekends])
                    .sort(compareAsc));
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
                onClick={() => setFieldValue('daysOff', [])}
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
              <Typography>Dni wolne: <strong>{values.daysOff.length}</strong></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DaysOffContainer>
                {values.daysOff.map(day => (
                  <DayChip
                    key={day.getTime()}
                    label={format(day, 'dd MMM yyyy')}
                    onDelete={() => setFieldValue('daysOff', (
                      // eslint-disable-next-line max-len
                      values.daysOff.filter(selectedDay => !isSameDay(selectedDay, day))
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
            {isSubmitting ? t('employees.form.add.loading') : t('employees.form.add.submit')}
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};
