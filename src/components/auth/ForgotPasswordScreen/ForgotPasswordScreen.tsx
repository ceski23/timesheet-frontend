import React, { FC } from 'react';
import {
  CardContent, Typography, styled, Card, Grid, IconButton,
} from '@material-ui/core';
import { ForgotPasswordData } from 'store/auth/types';
import BackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import { ReactComponent as ForgotPasswordImage } from 'assets/forgot_password.svg';
import AppLogo from 'assets/logo.png';
import { useTranslation } from 'react-i18next';
import { useThunkDispatch } from 'store';
import { requestPasswordReset } from 'store/auth/slice';
import formErrorHandler from 'utils/formErrorHandler';
import Notificator from 'utils/Notificator';
import { ROUTE_HOME } from 'routes';
import { FormikHelpers } from 'formik';
import { ApiError } from 'utils/api';
import { ForgotPasswordForm } from '.';

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

export const ForgotPasswordScreen: FC = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const dispatch = useThunkDispatch();

  const handleForgotPassword = async (
    values: ForgotPasswordData, actions: FormikHelpers<ForgotPasswordData>,
  ) => {
    const result = await dispatch(requestPasswordReset(values));
    if (requestPasswordReset.fulfilled.match(result)) {
      Notificator.success(t('forgot_password.success'), {
        autoHideDuration: 10000,
      });
      history.replace(ROUTE_HOME);
    } else {
      formErrorHandler(result.payload as ApiError, actions.setErrors);
    }
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const forgotFormInitialValues = {
    email: '',
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
            <Typography variant="h6">{t('forgot_password.title')}</Typography>
          </Grid>
          <Desc gutterBottom variant="subtitle1">{t('forgot_password.subtitle')}</Desc>
          <ForgotPasswordForm
            handleSubmit={handleForgotPassword}
            initialValues={forgotFormInitialValues}
          />
        </CardContent>
      </StyledCard>
    </Container>
  );
};
