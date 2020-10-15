/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { InputAdornment, styled, TextField } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { FormParams2, Stylable } from 'utils/types';
import { Credentials } from 'api/auth';

// #region styles
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});
// #endregion

export const LoginForm: FC<FormParams2<Credentials> & Stylable> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit, register, errors, formState,
  } = form;

  return (
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="login-email"
        type="text"
        autoComplete="email"
        name="email"
        label={t('form:fields.email')}
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="login-password"
        type="password"
        autoComplete="current-password"
        name="password"
        label={t('form:fields.password')}
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message || ''}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={formState.isSubmitting}
        type="submit"
        style={{ marginTop: 40 }}
      >
        {formState.isSubmitting ? t('form:loading.login') : t('form:submit.login')}
      </Button>
    </StyledForm>
  );
};
