import React, { FC } from 'react';
import {
  Formik, FormikProps, Field, Form,
} from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Credentials } from 'features/auth/types';
import { FormParams } from 'shared/types';

export const LoginForm: FC<FormParams<Credentials>> = ({
  handleSubmit, error, initialValues, className,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting }: FormikProps<Credentials>) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Form style={{ display: 'flex', flexDirection: 'column' }} className={className}>
        {error && <Typography>{error}</Typography>}
        <Field
          type="text"
          name="email"
          label="Email"
          component={TextField}
          variant="outlined"
          style={{ margin: 10 }}
        />
        <Field
          type="password"
          name="password"
          label="Password"
          variant="outlined"
          component={TextField}
          style={{ margin: 10 }}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type="submit"
          style={{ margin: 10, marginTop: 40 }}
        >{isSubmitting ? 'Logowanie...' : 'Zaloguj'}
        </Button>
        <Button
          color="primary"
          type="button"
          style={{ margin: 10 }}
        >Rejestracja
        </Button>
      </Form>
    )}
  </Formik>
);
