import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SourceDestinationMapping from './source-destination-mapping';
import SourceDestinationMappingDetail from './source-destination-mapping-detail';
import SourceDestinationMappingUpdate from './source-destination-mapping-update';
import SourceDestinationMappingDeleteDialog from './source-destination-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SourceDestinationMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SourceDestinationMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SourceDestinationMappingDetail} />
      <ErrorBoundaryRoute path={match.url} component={SourceDestinationMapping} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SourceDestinationMappingDeleteDialog} />
  </>
);

export default Routes;
