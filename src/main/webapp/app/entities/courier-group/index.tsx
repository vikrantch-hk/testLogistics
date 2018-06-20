import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CourierGroup from './courier-group';
import CourierGroupDetail from './courier-group-detail';
import CourierGroupUpdate from './courier-group-update';
import CourierGroupDeleteDialog from './courier-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CourierGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CourierGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CourierGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={CourierGroup} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CourierGroupDeleteDialog} />
  </>
);

export default Routes;
