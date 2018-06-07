import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourierPickupInfo from './courier-pickup-info';
import CourierPickupInfoDetail from './courier-pickup-info-detail';
import CourierPickupInfoUpdate from './courier-pickup-info-update';
import CourierPickupInfoDeleteDialog from './courier-pickup-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CourierPickupInfoUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CourierPickupInfoUpdate} />
      <Route exact path={`${match.url}/:id`} component={CourierPickupInfoDetail} />
      <Route path={match.url} component={CourierPickupInfo} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CourierPickupInfoDeleteDialog} />
  </>
);

export default Routes;
