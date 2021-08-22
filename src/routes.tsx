import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Favorits from './pages/Favorits';
import Home from './pages/Home';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favoritos" component={Favorits} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
