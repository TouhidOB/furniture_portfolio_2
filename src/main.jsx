import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { CMSProvider } from './context/CMSContext';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <CMSProvider>
        <App />
      </CMSProvider>
    </HashRouter>
  </React.StrictMode>
);
