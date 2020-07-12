import React, { ChangeEvent } from 'react';
import {
  styled, RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core';
import { useThunkDispatch } from 'store';
import { useSelector } from 'react-redux';
import { selectTheme, setTheme } from 'features/preferences/slice';
import { ThemeType } from 'features/preferences/types';
import { useTranslation } from 'react-i18next';

const StyledThemeControls = styled(RadioGroup)(({ theme }) => ({
  margin: `0 ${theme.spacing(2)}px`,
}));

export const ThemeChooser = () => {
  const dispatch = useThunkDispatch();
  const themeType = useSelector(selectTheme);
  const { t } = useTranslation();

  const handleThemeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTheme(target.value as ThemeType));
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
