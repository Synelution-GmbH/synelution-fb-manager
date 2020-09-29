import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { Nav } from "./Nav";
import { Footer } from "./Footer";

const Home = React.lazy(() => import("../pages/Home"));

export default class MainRouter extends Component {
  render() {
    return (
      <>
        <Nav />

        <Suspense fallback={null}>
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
            <Footer />
          </div>
        </Suspense>
      </>
    );
  }
}
