import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourierPricingEngine from './courier-pricing-engine';
import CourierPricingEngineDetail from './courier-pricing-engine-detail';
import CourierPricingEngineUpdate from './courier-pricing-engine-update';
import CourierPricingEngineDeleteDialog from './courier-pricing-engine-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CourierPricingEngineUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CourierPricingEngineUpdate} />
      <Route exact path={`${match.url}/:id`} component={CourierPricingEngineDetail} />
      <Route path={match.url} component={CourierPricingEngine} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CourierPricingEngineDeleteDialog} />
  </>
);

export default Routes;
