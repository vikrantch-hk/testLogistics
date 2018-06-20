import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AwbStatus from './awb-status';
import AwbStatusDetail from './awb-status-detail';
import AwbStatusUpdate from './awb-status-update';
import AwbStatusDeleteDialog from './awb-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AwbStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AwbStatusUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AwbStatusDetail} />
      <ErrorBoundaryRoute path={match.url} component={AwbStatus} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AwbStatusDeleteDialog} />
  </>
);

export default Routes;
