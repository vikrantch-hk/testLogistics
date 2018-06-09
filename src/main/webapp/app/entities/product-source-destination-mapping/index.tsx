import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductSourceDestinationMapping from './product-source-destination-mapping';
import ProductSourceDestinationMappingDetail from './product-source-destination-mapping-detail';
import ProductSourceDestinationMappingUpdate from './product-source-destination-mapping-update';
import ProductSourceDestinationMappingDeleteDialog from './product-source-destination-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={ProductSourceDestinationMappingUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={ProductSourceDestinationMappingUpdate} />
      <Route exact path={`${match.url}/:id`} component={ProductSourceDestinationMappingDetail} />
      <Route path={match.url} component={ProductSourceDestinationMapping} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={ProductSourceDestinationMappingDeleteDialog} />
  </>
);

export default Routes;
