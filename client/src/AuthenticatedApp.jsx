import React, { useEffect } from 'react';
import { SocketProvider } from 'services/socket-provider';
import MainRouter from './router';

const AuthenticatedApp = () => {
  return (
    <SocketProvider>
      <MainRouter />
    </SocketProvider>
  );
};
export default AuthenticatedApp;
