import React, { FC, useState } from 'react';
import {
  Formik, Form,
} from 'formik';
import Button from '@material-ui/core/Button';
import { RegisterData } from 'features/auth/types';
import { FormParams } from 'shared/types';
import { FormField } from 'shared/components/FormField';
import { useTranslation } from 'react-i18next';
import { Collapse } from '@material-ui/core';
import { registerFormSchema } from './schema';
import { PasswordRequirements } from './PasswordRequirements';

export const RegisterForm: FC<FormParams<RegisterData>> = ({
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
      validationSchema={registerFormSchema}
    >
      {({ isSubmitting, values }) => (
        <Form style={{ display: 'flex', flexDirection: 'column' }} className={className}>
          <FormField
            type="text"
            autoComplete="name"
            name="name"
            label={t('register.form.name')}
            required
          />
          <FormField
            type="text"
            autoComplete="email"
            name="email"
            label={t('register.form.email')}
            required
          />
          <FormField
            type="password"
            autoComplete="new-password"
            name="password"
            label={t('register.form.password')}
            required
            onFocus={handlePasswordFocus}
            inputProps={{
              onBlur: handlePasswordBlur,
            }}
          />

          <Collapse in={showRequirements}>
            <PasswordRequirements password={values.password} />
          </Collapse>

          <FormField
            type="password"
            autoComplete="new-password"
            name="repeatPassword"
            label={t('register.form.repeat_password')}
            required
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
            style={{ marginTop: 40 }}
          >
            {isSubmitting ? t('register.form.register_loading') : t('register.form.register')}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
