import React, { FC, useState, useEffect } from 'react';
import {
  CardContent, Typography, styled, Card,
} from '@material-ui/core';
import { ResetPasswordData } from 'store/auth/types';
import { useHistory } from 'react-router';
import { ReactComponent as ForgotPasswordImage } from 'assets/forgot_password.svg';
import AppLogo from 'assets/logo.png';
import { useTranslation } from 'react-i18next';
import { useThunkDispatch } from 'store';
import { resetPassword } from 'store/auth/slice';
import formErrorHandler from 'utils/formErrorHandler';
import Notificator from 'utils/Notificator';
import { FormikHelpers } from 'formik';
import { useURLQuery } from 'hooks/useURLQuery';
import { ApiError } from 'utils/api';
import { routeUrls } from 'routes';
import { ResetPasswordForm } from './ResetPasswordForm';

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

export const ResetPasswordScreen: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useThunkDispatch();
  const [token, setToken] = useState('');
  const query = useURLQuery();

  useEffect(() => {
    setToken(query.get('token') || '');
  }, [query]);

  const handleResetPassword = async (
    values: ResetPasswordData, actions: FormikHelpers<ResetPasswordData>,
  ) => {
    const result = await dispatch(resetPassword(values));
    if (resetPassword.fulfilled.match(result)) {
      Notificator.success(t('reset_password.reset_success'), {
        autoHideDuration: 5000,
      });
      history.replace(routeUrls.home);
    } else {
      formErrorHandler(result.payload as ApiError, actions.setErrors);
    }
  };

  const formInitialValues = {
    password: '',
    repeatPassword: '',
    token,
  };

  return (
    <Container>
      <Logo src={AppLogo} />
      <MainImage />
      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h6">{t('reset_password.title')}</Typography>
          <ResetPasswordForm
            handleSubmit={handleResetPassword}
            initialValues={formInitialValues}
          />
        </CardContent>
      </StyledCard>
    </Container>
  );
};
