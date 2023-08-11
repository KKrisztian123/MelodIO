import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { initializeBaseUrl } from '@features/ServerEndpoint';
import { register } from 'swiper/element/bundle';
//registering custom swiper elements.
register();


if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

const container = document.getElementById('root');
const root = createRoot(container!);
initializeBaseUrl();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);