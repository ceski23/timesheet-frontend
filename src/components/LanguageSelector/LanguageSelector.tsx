import React, {
  FC, ReactElement, ChangeEvent, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { selectPreferences } from 'features/preferences/selectors';
import { useTranslation } from 'react-i18next';
import { setLanguage } from 'features/preferences/preferencesSlice';
import { MenuItem, Select, styled } from '@material-ui/core';
import { useThunkDispatch } from 'store';
import Flag from 'react-world-flags';

const StyledSelect = styled(Select)(({ theme }) => ({
  margin: `0 ${theme.spacing(2)}px`,
}));

const FlagIcon = styled(Flag)(({ theme }) => ({
  width: 24,
  marginRight: theme.spacing(1),
}));

export const LanguageSelector: FC = (): ReactElement => {
  const { language } = useSelector(selectPreferences);
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
      <MenuItem value="en"><FlagIcon code="gb" /> English</MenuItem>
      <MenuItem value="pl"><FlagIcon code="pl" /> Polski</MenuItem>
    </StyledSelect>
  );
};
