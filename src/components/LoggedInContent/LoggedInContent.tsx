import React, { FC, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useThunkDispatch } from 'store';
import {
  CardContent, Typography, RadioGroup, FormControlLabel, Radio, styled, Card, Button,
} from '@material-ui/core';
import { setTheme } from 'features/preferences/preferencesSlice';
import { ThemeType } from 'features/preferences/types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTE_LOGOUT } from 'routes';
import { Test } from 'components/App/Test';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  height: 500,
}));

export const LoggedInContent: FC = () => {
  const dispatch = useThunkDispatch();
  const { t } = useTranslation();

  const { theme: themeType } = useSelector((state: RootState) => state.preferences);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTheme(target.value as ThemeType));
  };

  return (
    <>
      <Test />

      <StyledCard>
        <CardContent>
          <Typography gutterBottom variant="h6">{t('themeSwitcher.title')}</Typography>
          <RadioGroup value={themeType} onChange={handleChange}>
            {['dark', 'light', 'system'].map(type => (
              <FormControlLabel
                key={type}
                value={type}
                control={<Radio />}
                label={t(`themeType.${type}`)}
              />
            ))}
          </RadioGroup>
          <Button
            fullWidth
            color="primary"
            type="button"
            style={{ marginTop: 10 }}
            component={Link}
            to={ROUTE_LOGOUT}
          >
            Wyloguj
          </Button>
        </CardContent>
      </StyledCard>
    </>
  );
};
