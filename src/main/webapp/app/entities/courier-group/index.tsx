import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourierGroup from './courier-group';
import CourierGroupDetail from './courier-group-detail';
import CourierGroupUpdate from './courier-group-update';
import CourierGroupDeleteDialog from './courier-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CourierGroupUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CourierGroupUpdate} />
      <Route exact path={`${match.url}/:id`} component={CourierGroupDetail} />
      <Route path={match.url} component={CourierGroup} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CourierGroupDeleteDialog} />
  </>
);

export default Routes;
