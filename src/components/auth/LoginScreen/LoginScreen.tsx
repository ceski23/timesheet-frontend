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
import { errorHandler2 } from 'utils/errorHandlers';
import { Credentials, useLoginUser } from 'api/auth';
import { useSetAuth } from 'contexts/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginForm } from '.';
import { loginFormSchema } from './schema';

// #region styles
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  width: '30%',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
  textAlign: 'center',
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
// #endregion

export const LoginScreen: FC = () => {
  const { t } = useTranslation();
  const [loginUser] = useLoginUser();
  const setAuth = useSetAuth();

  const loginForm = useForm<Credentials>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginFormSchema),
  });

  const handleSubmit = async (values: Credentials) => {
    await loginUser(values, {
      onSuccess: user => {
        setAuth({ user, status: 'authorized' });
        Notificator.success(t('ui:notifications.success.login'));
      },
      onError: error => {
        errorHandler2(error as ApiError, loginForm.setError);
      },
    });
  };

  return (
    <Container>
      <Logo src={AppLogo} title="Timesheet" />
      <MainImage />
      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1">{t('ui:login.title')}</Typography>
          <Typography gutterBottom variant="subtitle1" component="p">{t('ui:login.subtitle')}</Typography>

          <LoginForm onSubmit={handleSubmit} form={loginForm} />

          <Button
            fullWidth
            color="primary"
            type="button"
            size="small"
            style={{ marginTop: 10 }}
            component={Link}
            to={routeUrls.forgotPassword}
          >
            {t('ui:login.forgot_password')}
          </Button>
        </CardContent>
      </StyledCard>
    </Container>
  );
};
