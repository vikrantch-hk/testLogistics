import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Courier from './courier';
import CourierDetail from './courier-detail';
import CourierUpdate from './courier-update';
import CourierDeleteDialog from './courier-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CourierUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CourierUpdate} />
      <Route exact path={`${match.url}/:id`} component={CourierDetail} />
      <Route path={match.url} component={Courier} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CourierDeleteDialog} />
  </>
);

export default Routes;
