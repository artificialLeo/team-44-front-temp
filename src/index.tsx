import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare global {
    interface Window {
        isUserAuthorized?: boolean;
    }
}

window.isUserAuthorized = false;

root.render(
  <React.StrictMode>
      <CssBaseline />
      <App />
  </React.StrictMode>
);
