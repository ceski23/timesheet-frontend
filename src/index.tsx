import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/app/App';
// import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';
import 'utils/i18n';
import { BrowserRouter } from 'react-router-dom';
import { PreferencesProvider } from 'contexts/preferences';
import { AuthProvider } from 'contexts/auth';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <PreferencesProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PreferencesProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

// serviceWorker.unregister();
