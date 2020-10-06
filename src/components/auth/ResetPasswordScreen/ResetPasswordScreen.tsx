import React, { FC, useEffect } from 'react';
import {
  CardContent, Typography, styled, Card,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { ReactComponent as ForgotPasswordImage } from 'assets/forgot_password.svg';
import AppLogo from 'assets/logo.png';
import { useTranslation } from 'react-i18next';
import Notificator from 'utils/Notificator';
import { useURLQuery } from 'hooks/useURLQuery';
import { ApiError } from 'utils/api';
import { routeUrls } from 'routes';
import { errorHandler2 } from 'utils/errorHandlers';
import { ResetPasswordData, useResetPassword } from 'api/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const query = useURLQuery();
  const [resetPassword] = useResetPassword();

  const resetPasswordForm = useForm<ResetPasswordData>({
    defaultValues: {
      password: '',
      repeatPassword: '',
      token: '',
    },
    resolver: yupResolver(resetPasswordFormSchema),
  });

  useEffect(() => {
    resetPasswordForm.setValue('token', query.get('token') || '');
  }, [query]);

  const handleResetPassword = async (values: ResetPasswordData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...data } = values;

    await resetPassword(data, {
      onSuccess: () => {
        Notificator.success(t('reset_password.reset_success'), {
          autoHideDuration: 5000,
        });
        history.replace(routeUrls.home);
      },
      onError: error => {
        errorHandler2(error as ApiError, resetPasswordForm.setError);
      },
    });
  };

  return (
    <Container>
      <Logo src={AppLogo} />
      <MainImage />
      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h6">{t('reset_password.title')}</Typography>
          <ResetPasswordForm onSubmit={handleResetPassword} form={resetPasswordForm} />
        </CardContent>
      </StyledCard>
    </Container>
  );
};
