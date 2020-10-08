/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { Collapse, styled, TextField } from '@material-ui/core';
import { FormParams2, Stylable } from 'utils/types';
import { ResetPasswordData } from 'api/auth';
import { PasswordRequirements } from '../ForgotPasswordScreen';

// #region styles
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});
// #endregion

export const ResetPasswordForm: FC<FormParams2<ResetPasswordData> & Stylable> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const [showRequirements, setShowRequirements] = useState(false);
  const {
    handleSubmit, formState, watch, register, errors,
  } = form;
  const watchedPassword = watch('password');

  const handlePasswordFocus = () => {
    setShowRequirements(true);
  };

  const handlePasswordBlur = () => {
    setShowRequirements(false);
  };

  return (
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        type="text"
        name="token"
        label={t('form:fields.reset_token')}
        required
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.token}
        helperText={errors.token?.message || ''}
      />
      <TextField
        type="password"
        autoComplete="new-password"
        name="password"
        label={t('form:fields.new_password')}
        required
        onFocus={handlePasswordFocus}
        inputProps={{
          onBlur: handlePasswordBlur,
        }}
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message || ''}
      />

      <Collapse in={showRequirements}>
        <PasswordRequirements
          password={watchedPassword}
          requirements={[
            { regex: /.{8,}/, text: t('form:validation.password.min') },
            { regex: /[0-9]+/, text: t('form:validation.password.digit') },
            { regex: /[a-zA-Z]+/, text: t('form:validation.password.alpha') },
            { regex: /[#?!@$%^&*-]+/, text: t('form:validation.password.special') },
          ]}
        />
      </Collapse>

      <TextField
        type="password"
        autoComplete="new-password"
        name="repeatPassword"
        label={t('form:fields.repeat_password')}
        required
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message || ''}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={formState.isSubmitting}
        type="submit"
        style={{ marginTop: 32 }}
      >
        {formState.isSubmitting ? t('form:loading.reset_password') : t('form:submit.reset_password')}
      </Button>
    </StyledForm>
  );
};
