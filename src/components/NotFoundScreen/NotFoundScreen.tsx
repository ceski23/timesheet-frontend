import React, { FC, ReactElement, useEffect } from 'react';
import { useThunkDispatch } from 'store';
import { setScreen } from 'features/appState/slice';
import { Typography, Button, styled } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const StyledButton = styled(Button)({
  marginTop: 64,
});

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  flex: 1,
});

const Heading = styled(Typography)({
  fontSize: 136,
  fontWeight: 500,
});

export const NotFoundScreen: FC = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    dispatch(setScreen('notfound'));
  }, []);

  const handleClickBack = () => {
    history.goBack();
  };

  return (
    <Container>
      <Heading variant="h1" color="textPrimary">404</Heading>
      <Typography variant="h4" color="textSecondary">{t('notfound.text')}</Typography>
      <StyledButton
        size="large"
        variant="contained"
        color="secondary"
        onClick={handleClickBack}
      >{t('notfound.goback')}
      </StyledButton>
    </Container>
  );
};
