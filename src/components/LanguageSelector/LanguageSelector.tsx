import React, {
  FC, ReactElement, ChangeEvent, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguage, selectLanguage } from 'store/preferences/slice';
import { MenuItem, Select, styled } from '@material-ui/core';
import { useThunkDispatch } from 'store';
import ReactCountryFlag from 'react-country-flag';

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
  const language = useSelector(selectLanguage);
  const { i18n } = useTranslation();
  const dispatch = useThunkDispatch();

  const handleLanguageSelect = ({ target }: ChangeEvent<{ value: unknown }>) => {
    dispatch(setLanguage(target.value as string));
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
