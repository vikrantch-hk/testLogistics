import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Hub from './hub';
import HubDetail from './hub-detail';
import HubUpdate from './hub-update';
import HubDeleteDialog from './hub-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={HubUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={HubUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={HubDetail} />
      <ErrorBoundaryRoute path={match.url} component={Hub} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={HubDeleteDialog} />
  </>
);

export default Routes;
