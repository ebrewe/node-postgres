import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import TodosIndex from './components/todos_index';
import Logout from './components/logout';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TodosIndex} />
    <Route path="/logout" component={Logout} />
  </Route>
);
