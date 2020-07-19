import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import { Credentials } from 'store/auth/types';
import { FormParams } from 'shared/types';
import { FormField } from 'components/shared/FormField';
import { useTranslation } from 'react-i18next';
import { InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircleOutlined';
import LockOutlined from '@material-ui/icons/LockOutlined';
import { loginFormSchema } from './schema';

export const LoginForm: FC<FormParams<Credentials>> = ({
  handleSubmit, initialValues, className,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginFormSchema}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: 'flex', flexDirection: 'column' }} className={className}>
          <FormField
            type="text"
            autoComplete="email"
            name="email"
            label={t('login.form.email')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <FormField
            type="password"
            autoComplete="current-password"
            name="password"
            label={t('login.form.password')}
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
            disabled={isSubmitting}
            type="submit"
            style={{ marginTop: 40 }}
          >
            {isSubmitting ? t('login.form.login_loading') : t('login.form.login')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
