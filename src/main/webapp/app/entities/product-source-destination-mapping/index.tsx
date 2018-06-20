import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProductSourceDestinationMapping from './product-source-destination-mapping';
import ProductSourceDestinationMappingDetail from './product-source-destination-mapping-detail';
import ProductSourceDestinationMappingUpdate from './product-source-destination-mapping-update';
import ProductSourceDestinationMappingDeleteDialog from './product-source-destination-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProductSourceDestinationMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProductSourceDestinationMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProductSourceDestinationMappingDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProductSourceDestinationMapping} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProductSourceDestinationMappingDeleteDialog} />
  </>
);

export default Routes;
