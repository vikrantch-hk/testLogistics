import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import PincodeRegionZone from './pincode-region-zone';
import PincodeRegionZoneDetail from './pincode-region-zone-detail';
import PincodeRegionZoneUpdate from './pincode-region-zone-update';
import PincodeRegionZoneDeleteDialog from './pincode-region-zone-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={PincodeRegionZoneUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={PincodeRegionZoneUpdate} />
      <Route exact path={`${match.url}/:id`} component={PincodeRegionZoneDetail} />
      <Route path={match.url} component={PincodeRegionZone} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={PincodeRegionZoneDeleteDialog} />
  </>
);

export default Routes;
