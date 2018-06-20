import * as React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Awb from './awb';
import AwbDetail from './awb-detail';
import AwbUpdate from './awb-update';
import AwbDeleteDialog from './awb-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AwbUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AwbUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AwbDetail} />
      <ErrorBoundaryRoute path={match.url} component={Awb} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AwbDeleteDialog} />
  </>
);

export default Routes;
