/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
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

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const axe = require('@axe-core/react');
  // FIXME: https://github.com/dequelabs/axe-core-npm/issues/92
  setTimeout(() => {
    axe(React, ReactDOM, 1000);
  }, 2000);
}

// serviceWorker.unregister();
