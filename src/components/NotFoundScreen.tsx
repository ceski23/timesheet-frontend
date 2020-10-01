import React, { FC, ReactElement } from 'react';
import { Typography, Button, styled } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';

// #region styles
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
// #endregion

export const NotFoundScreen: FC = (): ReactElement => {
  useAppScreen('notfound');
  const { t } = useTranslation();
  const history = useHistory();

  const handleClickBack = () => {
    history.goBack();
  };

  return (
    <ScreenWrapper title={t('notfound.title')}>
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
    </ScreenWrapper>
  );
};
