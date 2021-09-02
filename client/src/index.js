import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './components/global-style/global-style'
import AccountContextProvider from './contexts/account-context';
import FunctionContextProvider from './contexts/function-context';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <AccountContextProvider>
      <FunctionContextProvider>
        <App />

      </FunctionContextProvider>

    </AccountContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

