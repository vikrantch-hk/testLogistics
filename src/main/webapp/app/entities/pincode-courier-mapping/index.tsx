import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PincodeCourierMapping from './pincode-courier-mapping';
import PincodeCourierMappingDetail from './pincode-courier-mapping-detail';
import PincodeCourierMappingUpdate from './pincode-courier-mapping-update';
import PincodeCourierMappingDeleteDialog from './pincode-courier-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PincodeCourierMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PincodeCourierMappingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PincodeCourierMappingDetail} />
      <ErrorBoundaryRoute path={match.url} component={PincodeCourierMapping} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PincodeCourierMappingDeleteDialog} />
  </>
);

export default Routes;
