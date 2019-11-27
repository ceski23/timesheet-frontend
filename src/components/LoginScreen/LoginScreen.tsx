import React, { FC, useState } from 'react';
import {
  CardContent, Typography, styled, Card, Button,
} from '@material-ui/core';
import { Credentials } from 'features/auth/types';
import { FormikHelpers } from 'formik';
import { login } from 'features/auth/authSlice';
import formErrorHandler from 'utils/formErrorHandler';
import { useThunkDispatch } from 'store';
import { LoginForm } from 'components/LoginForm';
import { Link } from 'react-router-dom';
import { ROUTE_REGISTER } from 'routes';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export const LoginScreen: FC = () => {
  const dispatch = useThunkDispatch();

  const [loginError, setLoginError] = useState();

  const handleSubmit = async (values: Credentials, actions: FormikHelpers<Credentials>) => {
    setLoginError(undefined);

    return dispatch(login(values))
      .catch(error => formErrorHandler(error, setLoginError, actions.setErrors));
  };

  const loginFormInitialValues = {
    email: '',
    password: '',
  };

  return (
    <>
      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h6">Logowanie</Typography>
          <LoginForm
            handleSubmit={handleSubmit}
            error={loginError}
            initialValues={loginFormInitialValues}
          />
          <Button
            fullWidth
            color="primary"
            type="button"
            style={{ marginTop: 10 }}
            component={Link}
            to={ROUTE_REGISTER}
          >
            Rejestracja
          </Button>
        </CardContent>
      </StyledCard>
    </>
  );
};
