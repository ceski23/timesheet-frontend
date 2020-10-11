/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, FormGroup, FormLabel, MenuItem,
  styled, TextField,
} from '@material-ui/core';
import {
  DatePicker,
  DateTimePicker, TimePicker,
} from '@material-ui/pickers';
import {
  Controller,
} from 'react-hook-form';
import { FormParams2 } from 'utils/types';
import { AddRecordParams, ApproveRecordsParams, RECORD_TYPES } from 'api/records';
import { set } from 'date-fns';

// #region styles
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const DateRangeFormGroup = styled(FormGroup)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '32px',
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: 'auto',
    gap: '0px',
  },
}));

// #endregion

export const ApproveRecordsForm: FC<FormParams2<ApproveRecordsParams>> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const {
    register, handleSubmit, control, formState, errors, watch,
    setValue,
  } = form;
  const { isSubmitting } = formState;

  return (
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="date"
        render={p => (
          <DatePicker
            label={t('form:fields.approve_month')}
            margin="normal"
            autoOk
            required
            format="LLLL yyyy"
            inputVariant="outlined"
            error={!!errors.date}
            helperText={errors.date?.message || ''}
            autoFocus
            views={['month', 'year']}
            disableFuture
            {...p}
          />
        )}
      />

      <SubmitButton
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? t('form:loading.approve_records') : t('form:submit.approve_records')}
      </SubmitButton>
    </StyledForm>
  );
};
