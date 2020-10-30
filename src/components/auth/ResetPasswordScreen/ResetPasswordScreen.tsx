import React, { FC, useEffect } from 'react';
import {
  CardContent, Typography, styled, Card,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router';
import { ReactComponent as ForgotPasswordImage } from 'assets/forgot_password.svg';
import AppLogo from 'assets/logo.png';
import { useTranslation } from 'react-i18next';
import Notificator from 'utils/Notificator';
import { routeUrls } from 'routes';
import { formErrorHandler } from 'utils/errorHandlers';
import { ResetPasswordData, useResetPassword } from 'api/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet';
import { ResetPasswordForm } from './ResetPasswordForm';
import { resetPasswordFormSchema } from './schema';

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
// #endregion

export const ResetPasswordScreen: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const [resetPassword] = useResetPassword();
  const location = useLocation();

  const queryToken = React.useMemo(() => (
    new URLSearchParams(location.search).get('token')
  ), [location.search]);

  const resetPasswordForm = useForm<ResetPasswordData>({
    defaultValues: {
      password: '',
      repeatPassword: '',
      token: '',
    },
    resolver: yupResolver(resetPasswordFormSchema),
  });

  useEffect(() => {
    resetPasswordForm.setValue('token', queryToken || '');
  }, [queryToken]);

  const handleResetPassword = async (values: ResetPasswordData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...data } = values;

    await resetPassword(data, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.reset_password'), {
          autoHideDuration: 5000,
        });
        history.replace(routeUrls.home);
      },
      onError: error => {
        formErrorHandler(error, resetPasswordForm.setError, e => {
          switch (e) {
            case 'Invalid token': return t('ui:password_reset.invalid_token');
            default: return t('ui:notifications.failure.update_schedule');
          }
        });
      },
    });
  };

  return (
    <Container>
      <Logo src={AppLogo} title="Timesheet" />
      <MainImage />
      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h1">{t('ui:password_reset.title')}</Typography>
          <ResetPasswordForm onSubmit={handleResetPassword} form={resetPasswordForm} />
        </CardContent>
      </StyledCard>

      <Helmet>
        <title>{t('ui:password_reset.title')} — zarządzanie czasem pracy</title>
      </Helmet>
    </Container>
  );
};
