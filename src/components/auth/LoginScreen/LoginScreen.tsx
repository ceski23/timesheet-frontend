import React, { FC } from 'react';
import {
  CardContent, Typography, styled, Card, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LoginImage } from 'assets/login_image.svg';
import AppLogo from 'assets/logo.png';
import { ApiError } from 'utils/api';
import { routeUrls } from 'routes';
import { errorHandler } from 'utils/errorHandlers';
import { FormSubmitFunction } from 'utils/types';
import { Credentials, useLoginUser } from 'api/auth';
import { useSetAuth } from 'contexts/auth';
import { LoginForm } from '.';

// #region styles
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
  textAlign: 'center',
}));

const Title = styled(Typography)({
  textAlign: 'center',
});
// #endregion

export const LoginScreen: FC = () => {
  const { t } = useTranslation();
  const [loginUser] = useLoginUser();
  const setAuth = useSetAuth();

  const handleSubmit: FormSubmitFunction<Credentials> = async (values, actions) => {
    await loginUser(values, {
      onSuccess: user => {
        setAuth({ user, status: 'authorized' });
        Notificator.success(t('login.success_message'));
      },
      onError: error => {
        errorHandler(error as ApiError, actions.setErrors);
      },
    });
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
            size="small"
            style={{ marginTop: 10 }}
            component={Link}
            to={routeUrls.forgotPassword}
          >
            {t('login.forgot_password')}
          </Button>
        </CardContent>
      </StyledCard>
    </Container>
  );
};
