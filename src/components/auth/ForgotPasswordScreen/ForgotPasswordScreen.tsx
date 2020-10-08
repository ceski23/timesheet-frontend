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
import { ApiError } from 'utils/api';
import { routeUrls } from 'routes';
import { errorHandler2 } from 'utils/errorHandlers';
import { ForgotPasswordData, useRequestPasswordReset } from 'api/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordForm } from '.';
import { forgotPasswordFormSchema } from './schema';

// #region styles
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  width: '30%',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));

const MainImage = styled(ForgotPasswordImage)(({ theme }) => ({
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

const BackButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const Desc = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
}));
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
        errorHandler2(error as ApiError, forgotPasswordForm.setError);
      },
    });
  };

  const handleBackClick = () => {
    history.goBack();
  };

  return (
    <Container>
      <Logo src={AppLogo} />
      <MainImage />
      <StyledCard>
        <CardContent>
          <Grid container alignItems="center">
            <BackButton onClick={handleBackClick}>
              <BackIcon />
            </BackButton>
            <Typography variant="h6">{t('ui:forgot_password.title')}</Typography>
          </Grid>
          <Desc gutterBottom variant="subtitle1">{t('ui:forgot_password.subtitle')}</Desc>
          <ForgotPasswordForm onSubmit={handleForgotPassword} form={forgotPasswordForm} />
        </CardContent>
      </StyledCard>
    </Container>
  );
};
