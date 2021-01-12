import React, { Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'scss/index.min.css';

import { AuthProvider, useAuth } from './services/auth-provider';
import ScrollRestoration from './router/scrollRestoration';
import { Theme } from 'ui/theme';
import { ServiceWorkerNotice } from './ServiceWorkerNotice';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

export const App = () => {
  return (
    <Suspense fallback={null}>
      <CssBaseline />
      <ScrollRestoration>
        <Theme>
          <AuthProvider>
            <ServiceWorkerNotice />
            <AuthSwitcher />
          </AuthProvider>
        </Theme>
      </ScrollRestoration>
    </Suspense>
  );
};

const AuthSwitcher = () => {
  const { user } = useAuth();

  return user && user.role !== 'guest' ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  );
};
