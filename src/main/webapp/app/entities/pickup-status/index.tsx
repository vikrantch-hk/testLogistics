import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import PickupStatus from './pickup-status';
import PickupStatusDetail from './pickup-status-detail';
import PickupStatusUpdate from './pickup-status-update';
import PickupStatusDeleteDialog from './pickup-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={PickupStatusUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={PickupStatusUpdate} />
      <Route exact path={`${match.url}/:id`} component={PickupStatusDetail} />
      <Route path={match.url} component={PickupStatus} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={PickupStatusDeleteDialog} />
  </>
);

export default Routes;
