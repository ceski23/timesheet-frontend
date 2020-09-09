import React, { ChangeEvent } from 'react';
import {
  styled, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core';
import { ThemeType } from 'store/preferences/types';
import { useTranslation } from 'react-i18next';
import { usePreferences, useSetPreferences } from 'contexts/preferences';

const StyledThemeControls = styled(RadioGroup)(({ theme }) => ({
  margin: `0 ${theme.spacing(2)}px`,
}));

export const ThemeChooser = () => {
  const { t } = useTranslation();
  const { theme: themeType } = usePreferences();
  const setPreferences = useSetPreferences();

  const handleThemeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const type = target.value as ThemeType;
    setPreferences({ theme: type });
  };

  return (
    <StyledThemeControls value={themeType} onChange={handleThemeChange}>
      {['dark', 'light', 'system'].map(type => (
        <FormControlLabel
          key={type}
          value={type}
          control={<Radio />}
          label={t(`themeType.${type}`)}
        />
      ))}
    </StyledThemeControls>
  );
};
