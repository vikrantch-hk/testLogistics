import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CourierPricingEngine from './courier-pricing-engine';
import CourierPricingEngineDetail from './courier-pricing-engine-detail';
import CourierPricingEngineUpdate from './courier-pricing-engine-update';
import CourierPricingEngineDeleteDialog from './courier-pricing-engine-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CourierPricingEngineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CourierPricingEngineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CourierPricingEngineDetail} />
      <ErrorBoundaryRoute path={match.url} component={CourierPricingEngine} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CourierPricingEngineDeleteDialog} />
  </>
);

export default Routes;
