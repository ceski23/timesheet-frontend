import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import { Credentials } from 'features/auth/types';
import { FormParams } from 'shared/types';
import { FormField } from 'shared/components/FormField';

export const LoginForm: FC<FormParams<Credentials>> = ({
  handleSubmit, initialValues, className,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting }) => (
      <Form style={{ display: 'flex', flexDirection: 'column' }} className={className}>
        <FormField
          type="password"
          autoComplete="current-password"
          name="password"
          label="Hasło"
        />
        <FormField
          type="text"
          autoComplete="email"
          name="email"
          label="Adres email"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type="submit"
          style={{ marginTop: 40 }}
        >
          {isSubmitting ? 'Logowanie...' : 'Zaloguj'}
        </Button>
      </Form>
    )}
  </Formik>
);
