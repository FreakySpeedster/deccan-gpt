import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './features/store';
import { createRoot } from 'react-dom/client'



if (import.meta.env.VITE_ENABLE_MIRAGE === 'true') {
  import('./services/mirage').then(({ makeServer }) => {
    makeServer({ environment: import.meta.env.MODE });
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  });
} else {
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

}
