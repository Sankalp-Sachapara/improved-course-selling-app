import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, CssBaseline } from '@mui/material';

import App from './App';
import store from './store';
import theme from './theme';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
          <Toaster position="top-right" />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
