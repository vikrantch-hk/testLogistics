import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VendorWHCourierMapping from './vendor-wh-courier-mapping';
import VendorWHCourierMappingDetail from './vendor-wh-courier-mapping-detail';
import VendorWHCourierMappingUpdate from './vendor-wh-courier-mapping-update';
import VendorWHCourierMappingDeleteDialog from './vendor-wh-courier-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VendorWHCourierMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VendorWHCourierMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VendorWHCourierMappingDetail} />
      <ErrorBoundaryRoute path={match.url} component={VendorWHCourierMapping} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VendorWHCourierMappingDeleteDialog} />
  </>
);

export default Routes;
