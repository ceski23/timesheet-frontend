/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { FormParams2, Stylable } from 'utils/types';
import { ForgotPasswordData } from 'api/auth';
import { styled, TextField } from '@material-ui/core';

// #region styles
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});
// #endregion

export const ForgotPasswordForm: FC<FormParams2<ForgotPasswordData> & Stylable> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit, formState, register, errors,
  } = form;

  return (
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        autoComplete="email"
        name="email"
        label={t('form:fields.email')}
        required
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message || ''}
        id="forgotpassword-email"
      />
      <Button
        variant="contained"
        color="primary"
        disabled={formState.isSubmitting}
        type="submit"
        style={{ marginTop: 32 }}
      >
        {formState.isSubmitting ? t('form:loading.default') : t('form:submit.forgot_password')}
      </Button>
    </StyledForm>
  );
};
