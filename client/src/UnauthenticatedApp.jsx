import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Login = React.lazy(() => import('pages/Login'));

const AuthenticatedApp = () => {
  return (
    <Suspense fallback={null}>
      <div className="main-content">
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Suspense>
  );
};
export default AuthenticatedApp;
