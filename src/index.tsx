import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from 'components/App';
// import * as serviceWorker from './serviceWorker';
import { ThemeContainer } from 'components/ThemeContainer';
import { CssBaseline } from '@material-ui/core';
import store, { persistor } from './store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeContainer>
        <CssBaseline />
        <App />
      </ThemeContainer>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// serviceWorker.unregister();
