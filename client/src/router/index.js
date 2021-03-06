import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Nav } from './Nav';
// import { Footer } from './Footer';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Posts = React.lazy(() => import('../pages/Posts'));
const ClientView = React.lazy(() => import('pages/ClientView'));
const EditClient = React.lazy(() => import('pages/EditClient'));

export default class MainRouter extends Component {
  render() {
    return (
      <>
        <Nav />

        <Suspense fallback={null}>
          <div className="main-content">
            <Switch>
              <Route path="/:client/posts/:type" component={Posts} />
              <Route path="/client/:slug" component={EditClient} />
              {/* /from/:from/to/:to */}
              <Route exact path="/preview/:id" component={ClientView} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </Suspense>
      </>
    );
  }
}
