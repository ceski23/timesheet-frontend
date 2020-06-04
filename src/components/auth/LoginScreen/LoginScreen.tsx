import React, { FC } from 'react';
import {
  CardContent, Typography, styled, Card, Button,
} from '@material-ui/core';
import { Credentials } from 'features/auth/types';
import { FormikHelpers } from 'formik';
import { login } from 'features/auth/slice';
import formErrorHandler from 'utils/formErrorHandler';
import { useThunkDispatch } from 'store';
import { Link } from 'react-router-dom';
import { ROUTE_FORGOT_PASSWORD } from 'routes';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LoginImage } from 'assets/login_image.svg';
import AppLogo from 'assets/logo.png';
import { ApiError } from 'api';
import { LoginForm } from '.';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  width: '30%',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));

const MainImage = styled(LoginImage)(({ theme }) => ({
  width: '30%',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Logo = styled('img')(({ theme }) => ({
  position: 'fixed',
  left: theme.spacing(5),
  top: theme.spacing(5),
  height: 40,
}));

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  justifyContent: 'space-evenly',
  alignItems: 'center',
});

const Desc = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const LoginScreen: FC = () => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation();

  const handleSubmit = async (values: Credentials, actions: FormikHelpers<Credentials>) => {
    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      Notificator.success(t('login.success_message'));
    } else {
      formErrorHandler(result.payload as ApiError, actions.setErrors);
    }
  };

  const loginFormInitialValues = {
    email: '',
    password: '',
  };

  return (
    <Container>
      <Logo src={AppLogo} />
      <MainImage />
      <StyledCard>
        <CardContent>
          <Title gutterBottom variant="h5">{t('login.title')}</Title>
          <Desc gutterBottom variant="subtitle1">{t('login.subtitle')}</Desc>
          <LoginForm
            handleSubmit={handleSubmit}
            initialValues={loginFormInitialValues}
          />
          <Button
            fullWidth
            color="primary"
            type="button"
            style={{ marginTop: 10 }}
            component={Link}
            to={ROUTE_FORGOT_PASSWORD}
          >
            {t('login.forgot_password')}
          </Button>
        </CardContent>
      </StyledCard>
    </Container>
  );
};
