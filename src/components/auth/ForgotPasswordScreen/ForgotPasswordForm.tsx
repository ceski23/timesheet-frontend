import React, { FC } from 'react';
import {
  Formik, Form,
} from 'formik';
import Button from '@material-ui/core/Button';
import { FormField } from 'components/shared/FormField';
import { useTranslation } from 'react-i18next';
import { FormParams, Stylable } from 'utils/types';
import { ForgotPasswordData } from 'api/auth';
import { forgotPasswordFormSchema } from './schema';

export const ForgotPasswordForm: FC<FormParams<ForgotPasswordData> & Stylable> = ({
  handleSubmit, initialValues, className,
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={forgotPasswordFormSchema}
    >
      {({ isSubmitting }) => (
        <Form style={{ display: 'flex', flexDirection: 'column' }} className={className}>
          <FormField
            type="text"
            autoComplete="email"
            name="email"
            label={t('forgot_password.form.email')}
            required
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
            style={{ marginTop: 32 }}
          >
            {isSubmitting ? t('forgot_password.form.loading') : t('forgot_password.form.send')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
