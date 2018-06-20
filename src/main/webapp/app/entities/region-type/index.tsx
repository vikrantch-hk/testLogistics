import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RegionType from './region-type';
import RegionTypeDetail from './region-type-detail';
import RegionTypeUpdate from './region-type-update';
import RegionTypeDeleteDialog from './region-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RegionTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RegionTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RegionTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={RegionType} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RegionTypeDeleteDialog} />
  </>
);

export default Routes;
