import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './features/store';
import { makeServer } from './services/mirage';
import { createRoot } from 'react-dom/client'


if (process.env.NODE_ENV === 'development') {
  makeServer();
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
