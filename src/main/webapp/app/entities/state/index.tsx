import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import State from './state';
import StateDetail from './state-detail';
import StateUpdate from './state-update';
import StateDeleteDialog from './state-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={StateUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={StateUpdate} />
      <Route exact path={`${match.url}/:id`} component={StateDetail} />
      <Route path={match.url} component={State} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={StateDeleteDialog} />
  </>
);

export default Routes;
