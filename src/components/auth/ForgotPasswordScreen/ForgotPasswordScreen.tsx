import React, { FC } from 'react';
import {
  CardContent, Typography, styled, Card, Grid, IconButton,
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import { ReactComponent as ForgotPasswordImage } from 'assets/forgot_password.svg';
import AppLogo from 'assets/logo.png';
import { useTranslation } from 'react-i18next';
import Notificator from 'utils/Notificator';
import { routeUrls } from 'routes';
import { formErrorHandler } from 'utils/errorHandlers';
import { ForgotPasswordData, useRequestPasswordReset } from 'api/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet';
import { ForgotPasswordForm } from '.';
import { forgotPasswordFormSchema } from './schema';

// #region styles
const BackButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  width: '30%',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
  textAlign: 'center',
}));

const MainImage = styled(ForgotPasswordImage)(({ theme }) => ({
  width: '30%',
  height: '100%',
  marginRight: '12vw',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Logo = styled('img')({
  height: 50,
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  justifyContent: 'space-evenly',
});

const LogoContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '90%',
  height: 150,
  alignItems: 'center',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
}));

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 128,
});
// #endregion

export const ForgotPasswordScreen: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [requestPasswordReset] = useRequestPasswordReset();

  const forgotPasswordForm = useForm<ForgotPasswordData>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordFormSchema),
  });

  const handleForgotPassword = async (values: ForgotPasswordData) => {
    await requestPasswordReset(values, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.forgot_password'), {
          autoHideDuration: 10000,
        });
        history.replace(routeUrls.home);
      },
      onError: error => {
        formErrorHandler(error, forgotPasswordForm.setError, e => {
          switch (e) {
            default: return t('ui:notifications.failure.forgot_password');
          }
        });
      },
    });
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <Container>
      <LogoContainer>
        <Logo src={AppLogo} title="Timesheet" />
      </LogoContainer>
      <Content>
        <MainImage />
        <StyledCard>
          <CardContent>
            <Grid container alignItems="center">
              <BackButton onClick={handleBackClick} title={t('ui:navigation.back')}>
                <BackIcon />
              </BackButton>
              <Typography variant="h6" component="h1">{t('ui:forgot_password.title')}</Typography>
            </Grid>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="p"
              style={{
                marginBottom: 8,
                marginTop: 8,
                textAlign: 'left',
              }}
            >{t('ui:forgot_password.subtitle')}
            </Typography>
            <ForgotPasswordForm onSubmit={handleForgotPassword} form={forgotPasswordForm} />
          </CardContent>
        </StyledCard>
      </Content>

      <Helmet>
        <title>{t('ui:forgot_password.title')} — zarządzanie czasem pracy</title>
      </Helmet>
    </Container>
  );
};
