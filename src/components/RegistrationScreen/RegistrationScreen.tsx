import React, { FC } from 'react';
import {
  CardContent, Typography, styled, Card, Grid, IconButton,
} from '@material-ui/core';
import { RegisterData } from 'features/auth/types';
import { FormikHelpers } from 'formik';
import { register } from 'features/auth/authSlice';
import formErrorHandler from 'utils/formErrorHandler';
import { useThunkDispatch } from 'store';
import { RegisterForm } from 'components/RegisterForm';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
}));

const BackButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

export const RegistrationScreen: FC = () => {
  const dispatch = useThunkDispatch();
  const history = useHistory();

  const handleRegister = async (values: RegisterData, actions: FormikHelpers<RegisterData>) => (
    dispatch(register(values))
      .catch(error => formErrorHandler(error, actions.setErrors))
  );

  const handleBackClick = () => {
    history.goBack();
  };

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
          <Grid container alignItems="center">
            <BackButton onClick={handleBackClick}>
              <BackIcon />
            </BackButton>
            <Typography variant="h6">Rejestracja</Typography>
          </Grid>
          <RegisterForm
            handleSubmit={handleRegister}
            initialValues={registerFormInitialValues}
          />
        </CardContent>
      </StyledCard>
    </>
  );
};
