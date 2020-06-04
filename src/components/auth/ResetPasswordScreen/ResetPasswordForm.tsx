import React, { FC, useState } from 'react';
import {
  Formik, Form,
} from 'formik';
import Button from '@material-ui/core/Button';
import { ResetPasswordData } from 'features/auth/types';
import { FormParams } from 'shared/types';
import { FormField } from 'shared/components/FormField';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@material-ui/core';
import { resetPasswordFormSchema } from './schema';
import { PasswordRequirements } from '../ForgotPasswordScreen';

export const ResetPasswordForm: FC<FormParams<ResetPasswordData>> = ({
  handleSubmit, initialValues, className,
}) => {
  const { t } = useTranslation();
  const [showRequirements, setShowRequirements] = useState(false);

  const handlePasswordFocus = () => {
    setShowRequirements(true);
  };

  const handlePasswordBlur = () => {
    setShowRequirements(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={resetPasswordFormSchema}
      enableReinitialize
    >
      {({ isSubmitting, values }) => (
        <Form style={{ display: 'flex', flexDirection: 'column' }} className={className}>
          <FormField
            type="text"
            name="token"
            label={t('reset_password.form.token')}
            required
          />
          <FormField
            type="password"
            autoComplete="new-password"
            name="password"
            label={t('reset_password.form.password')}
            required
            onFocus={handlePasswordFocus}
            inputProps={{
              onBlur: handlePasswordBlur,
            }}
          />

          <Collapse in={showRequirements}>
            <PasswordRequirements
              password={values.password}
              requirements={[
                { regex: /.{8,}/, text: t('reset_password.form.errors.password_min') },
                { regex: /[0-9]+/, text: t('reset_password.form.errors.password_digit') },
                { regex: /[a-zA-Z]+/, text: t('reset_password.form.errors.password_alpha') },
                { regex: /[#?!@$%^&*-]+/, text: t('reset_password.form.errors.password_special') },
              ]}
            />
          </Collapse>

          <FormField
            type="password"
            autoComplete="new-password"
            name="repeatPassword"
            label={t('reset_password.form.repeat_password')}
            required
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
            style={{ marginTop: 32 }}
          >
            {isSubmitting ? t('reset_password.form.loading') : t('reset_password.form.send')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
