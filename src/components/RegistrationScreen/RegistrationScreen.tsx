import React, { FC } from 'react';
import {
  CardContent, Typography, styled, Card,
} from '@material-ui/core';
import { RegisterData } from 'features/auth/types';
import { FormikHelpers } from 'formik';
import { register } from 'features/auth/authSlice';
import formErrorHandler from 'utils/formErrorHandler';
import { useThunkDispatch } from 'store';
import { RegisterForm } from 'components/RegisterForm';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export const RegistrationScreen: FC = () => {
  const dispatch = useThunkDispatch();

  const handleRegister = async (values: RegisterData, actions: FormikHelpers<RegisterData>) => (
    dispatch(register(values))
      .catch(error => formErrorHandler(error, actions.setErrors))
  );

  const registerFormInitialValues = {
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
  };

  return (
    <>
      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h6">Rejestracja</Typography>
          <RegisterForm
            handleSubmit={handleRegister}
            initialValues={registerFormInitialValues}
          />
        </CardContent>
      </StyledCard>
    </>
  );
};
