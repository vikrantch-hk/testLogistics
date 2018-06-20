import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CourierChannel from './courier-channel';
import CourierChannelDetail from './courier-channel-detail';
import CourierChannelUpdate from './courier-channel-update';
import CourierChannelDeleteDialog from './courier-channel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CourierChannelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CourierChannelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CourierChannelDetail} />
      <ErrorBoundaryRoute path={match.url} component={CourierChannel} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CourierChannelDeleteDialog} />
  </>
);

export default Routes;
