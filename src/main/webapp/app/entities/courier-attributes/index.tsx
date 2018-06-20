import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CourierAttributes from './courier-attributes';
import CourierAttributesDetail from './courier-attributes-detail';
import CourierAttributesUpdate from './courier-attributes-update';
import CourierAttributesDeleteDialog from './courier-attributes-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CourierAttributesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CourierAttributesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CourierAttributesDetail} />
      <ErrorBoundaryRoute path={match.url} component={CourierAttributes} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CourierAttributesDeleteDialog} />
  </>
);

export default Routes;
