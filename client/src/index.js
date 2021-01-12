// if you need it
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'intersection-observer';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { synleutionLogs } from 'utils/synelution-logs';
import { ServiceWorkerProvider } from 'services/service-worker-provider';

ReactDOM.render(
  <ServiceWorkerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServiceWorkerProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();

synleutionLogs();
