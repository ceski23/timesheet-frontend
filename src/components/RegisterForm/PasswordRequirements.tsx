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
      primary: { main: '#24b312', contrastText: '#fff' },
    },
  });

  const requirements = [
    { regex: /.{8,}/, text: t('register.form.errors.password_min') },
    { regex: /[0-9]+/, text: t('register.form.errors.password_digit') },
    { regex: /[a-zA-Z]+/, text: t('register.form.errors.password_alpha') },
    { regex: /[#?!@$%^&*-]+/, text: t('register.form.errors.password_special') },
  ];

  return (
    <MuiThemeProvider theme={colortheme}>
      <div>
        {requirements.map(({ regex, text }) => (
          <Requirement regex={regex} pass={password} text={text} />
        ))}
      </div>
    </MuiThemeProvider>
  );
};
