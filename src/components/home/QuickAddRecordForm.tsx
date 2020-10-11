/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, MenuItem,
  styled, TextField,
} from '@material-ui/core';
import {
  DateTimePicker, TimePicker,
} from '@material-ui/pickers';
import {
  Controller,
} from 'react-hook-form';
import { FormParams2 } from 'utils/types';
import { AddRecordParams, RECORD_TYPES } from 'api/records';
import { set } from 'date-fns';

// #region styles
const StyledForm = styled('form')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto auto auto 1fr auto',
  columnGap: '16px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '1fr auto',
  },
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: '1fr',
  },
}));

const DetailsField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    gridColumn: '1 / 3',
  },
  [theme.breakpoints.down('xs')]: {
    gridColumn: '1',
  },
}));

const SubmitButton = styled(Button)(() => ({
  marginTop: 16,
  marginBottom: 8,
}));
// #endregion

export const QuickAddRecordForm: FC<FormParams2<AddRecordParams>> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const {
    register, handleSubmit, control, formState, errors, watch,
    setValue,
  } = form;
  const { isSubmitting } = formState;
  const { dateFrom, dateTo } = watch(['dateFrom', 'dateTo']);

  useEffect(() => {
    const newDate = set(dateFrom, {
      hours: dateTo.getHours(),
      minutes: dateTo.getMinutes(),
    });

    setValue('dateTo', newDate);
  }, [dateFrom]);

  return (
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="dateFrom"
        render={p => (
          <DateTimePicker
            label={t('form:fields.date_from')}
            margin="normal"
            autoOk
            required
            format="dd.MM.yyyy - HH:mm"
            inputVariant="outlined"
            error={!!errors.dateFrom}
            helperText={errors.dateFrom?.message || ''}
            ampm={false}
            autoFocus
            {...p}
          />
        )}
      />

      <Controller
        control={control}
        name="dateTo"
        render={p => (
          <TimePicker
            label={t('form:fields.date_to')}
            margin="normal"
            autoOk
            required
            format="dd.MM.yyyy - HH:mm"
            inputVariant="outlined"
            error={!!errors.dateTo}
            helperText={errors.dateTo?.message || ''}
            ampm={false}
            {...p}
          />
        )}
      />

      <Controller
        control={control}
        name="type"
        render={p => (
          <TextField
            type="text"
            label={t('form:fields.record_type')}
            variant="outlined"
            margin="normal"
            error={!!errors.type}
            helperText={errors.type?.message || ''}
            required
            select
            {...p}
          >
            {RECORD_TYPES.map(type => (
              <MenuItem key={type} value={type}>{t(`ui:records.type.${type}`)}</MenuItem>
            ))}
          </TextField>
        )}
      />

      <DetailsField
        type="text"
        name="details"
        label={t('form:fields.record_details')}
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.details}
        helperText={errors.details?.message || ''}
        multiline
      />

      <SubmitButton
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? t('form:loading.add_record') : t('form:submit.add_record')}
      </SubmitButton>
    </StyledForm>
  );
};
