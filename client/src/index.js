import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './components/global-style/global-style'
import AccountContextProvider from './contexts/account-context';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AccountContextProvider>
      <App />

    </AccountContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

