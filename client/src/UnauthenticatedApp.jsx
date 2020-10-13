import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Login = React.lazy(() => import('pages/Login'));
const ClientView = React.lazy(() => import('pages/ClientView'));

const AuthenticatedApp = () => {
  return (
    <Suspense fallback={null}>
      <div className="main-content">
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/:id" component={ClientView} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Suspense>
  );
};
export default AuthenticatedApp;
