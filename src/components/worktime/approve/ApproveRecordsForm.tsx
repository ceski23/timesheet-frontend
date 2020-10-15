/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, styled } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Controller } from 'react-hook-form';
import { FormParams2 } from 'utils/types';
import { ApproveRecordsParams } from 'api/records';

// #region styles
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
// #endregion

export const ApproveRecordsForm: FC<FormParams2<ApproveRecordsParams>> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit, control, formState, errors,
  } = form;
  const { isSubmitting } = formState;

  return (
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="date"
        render={p => (
          <DatePicker
            id="approve-month"
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
