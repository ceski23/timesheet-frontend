import React, {
  FC, ReactElement, ChangeEvent, useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, styled } from '@material-ui/core';
import ReactCountryFlag from 'react-country-flag';
import { Language, usePreferences, useSetPreferences } from 'contexts/preferences';

// #region styles
const StyledSelect = styled(Select)(({ theme }) => ({
  margin: `0 ${theme.spacing(2)}px`,
}));

const FlagIcon = styled(ReactCountryFlag)(({ theme }) => ({
  width: 24,
  marginRight: theme.spacing(1),
}));
// #endregion

export const LanguageSelector: FC = (): ReactElement => {
  const { language } = usePreferences();
  const setPreferences = useSetPreferences();
  const { i18n } = useTranslation();

  const handleLanguageSelect = ({ target }: ChangeEvent<{ value: unknown }>) => {
    const lang = target.value as Language;
    setPreferences({ language: lang });
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <StyledSelect
      value={language}
      variant="outlined"
      margin="dense"
      onChange={handleLanguageSelect}
    >
      <MenuItem value="en"><FlagIcon countryCode="gb" svg /> English</MenuItem>
      <MenuItem value="pl"><FlagIcon countryCode="pl" svg /> Polski</MenuItem>
    </StyledSelect>
  );
};
