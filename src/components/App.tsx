import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { useThunkDispatch, RootState } from 'store';
import { login } from 'features/auth/authSlice';
import { LoginForm } from 'components/LoginForm';
import { Credentials } from 'features/auth/types';
import { client } from 'api';
import formErrorHandler from 'utils/formErrorHandler';
import {
  styled, Card, FormControlLabel, RadioGroup, Radio,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { setTheme } from 'features/preferences/preferencesSlice';
import { ThemeType } from 'features/preferences/types';

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const App: React.FC = () => {
  const dispatch = useThunkDispatch();
  const [loginError, setLoginError] = useState();

  const handleSubmit = async (values: Credentials, actions: FormikHelpers<Credentials>) => {
    setLoginError(undefined);

    dispatch(login(values))
      .then(tokens => client.get('me', { headers: { Authorization: `Bearer ${tokens.accessToken}` } }))
      .then(user => { alert(`Witaj ${user.data.name}!`); })
      .catch(error => formErrorHandler(error, setLoginError, actions.setErrors));

    actions.setSubmitting(false);
  };

  const { theme: themeType } = useSelector((state: RootState) => state.preferences);

  const loginFormInitialValues = {
    email: '',
    password: '',
  };

  return (
    <Container>
      <StyledCard>
        <LoginForm
          handleSubmit={handleSubmit}
          error={loginError}
          initialValues={loginFormInitialValues}
        />

        <RadioGroup
          value={themeType}
          onChange={e => dispatch(setTheme(e.target.value as ThemeType))}
        >
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="system" control={<Radio />} label="System" />
        </RadioGroup>
      </StyledCard>
    </Container>
  );
};

export default App;
