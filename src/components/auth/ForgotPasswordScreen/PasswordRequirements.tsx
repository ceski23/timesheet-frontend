import React, { FC, useEffect, useState } from 'react';
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
  const [color, setColor] = useState<'primary' | 'error'>();

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

export interface PasswordReqItem {
  regex: RegExp;
  text: string;
}

export interface Props {
  password: string;
  requirements: PasswordReqItem[];
}

export const PasswordRequirements: FC<Props> = ({ password, requirements }) => {
  const colortheme = createMuiTheme({
    palette: {
      primary: { main: '#24b312', contrastText: '#fff' },
    },
  });

  return (
    <MuiThemeProvider theme={colortheme}>
      <div>
        {requirements.map(({ regex, text }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Requirement regex={regex} pass={password} text={text} key={i} />
        ))}
      </div>
    </MuiThemeProvider>
  );
};
