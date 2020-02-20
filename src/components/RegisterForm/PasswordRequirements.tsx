import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Typography, styled, createMuiTheme, MuiThemeProvider,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const Text = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0px',
}));

const Requirement: FC<({
  regex: RegExp;
  pass: string;
  text: string;
})> = ({ regex, text, pass }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    setColor(regex.test(pass) ? 'primary' : 'error');
  }, [pass, regex]);

  return (
    <Text color={color}>
      {regex.test(pass) ? <CheckIcon color={color} /> : <CloseIcon color={color} />}
      &nbsp;&nbsp;{text}
    </Text>
  );
};

export const PasswordRequirements: FC<({ password: string })> = ({ password }) => {
  const { t } = useTranslation();

  const colortheme = createMuiTheme({
    palette: {
      primary: { main: '#7CFC00', contrastText: '#fff' },
    },
  });

  return (
    <MuiThemeProvider theme={colortheme}>
      <div>
        <Requirement regex={/.{8,}/} pass={password} text={t('register.form.errors.password_min')} />
        <Requirement regex={/[0-9]+/} pass={password} text={t('register.form.errors.password_digit')} />
        <Requirement regex={/[a-zA-Z]+/} pass={password} text={t('register.form.errors.password_alpha')} />
        <Requirement regex={/[#?!@$%^&*-]+/} pass={password} text={t('register.form.errors.password_special')} />
      </div>
    </MuiThemeProvider>
  );
};
