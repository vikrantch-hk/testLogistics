import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PincodeRegionZone from './pincode-region-zone';
import PincodeRegionZoneDetail from './pincode-region-zone-detail';
import PincodeRegionZoneUpdate from './pincode-region-zone-update';
import PincodeRegionZoneDeleteDialog from './pincode-region-zone-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PincodeRegionZoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PincodeRegionZoneUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PincodeRegionZoneDetail} />
      <ErrorBoundaryRoute path={match.url} component={PincodeRegionZone} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PincodeRegionZoneDeleteDialog} />
  </>
);

export default Routes;
