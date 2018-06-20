import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pincode from './pincode';
import PincodeDetail from './pincode-detail';
import PincodeUpdate from './pincode-update';
import PincodeDeleteDialog from './pincode-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PincodeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PincodeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PincodeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pincode} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PincodeDeleteDialog} />
  </>
);

export default Routes;
