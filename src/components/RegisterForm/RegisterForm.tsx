import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import { RegisterData } from 'features/auth/types';
import { FormParams } from 'shared/types';
import { FormField } from 'shared/components/FormField';
import * as yup from 'yup';

const registerFormSchema = yup.object().shape({
  name: yup.string().min(1).max(255).required(),
  email: yup.string().email().required(),
  password: yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
  repeatPassword: yup.string().oneOf([yup.ref('password')]).required(),
});

export const RegisterForm: FC<FormParams<RegisterData>> = ({
  handleSubmit, initialValues, className,
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={registerFormSchema}
  >
    {({ isSubmitting }) => (
      <Form style={{ display: 'flex', flexDirection: 'column' }} className={className}>
        <FormField
          type="text"
          autoComplete="name"
          name="name"
          label="Imię i nazwisko"
        />
        <FormField
          type="text"
          autoComplete="email"
          name="email"
          label="Email"
        />
        <FormField
          type="password"
          autoComplete="new-password"
          name="password"
          label="Hasło"
        />
        <FormField
          type="password"
          autoComplete="new-password"
          name="repeatPassword"
          label="Powtórz hasło"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          type="submit"
          style={{ marginTop: 40 }}
        >
          {isSubmitting ? 'Rejestrowanie...' : 'Zarejestruj'}
        </Button>
      </Form>
    )}
  </Formik>
);
