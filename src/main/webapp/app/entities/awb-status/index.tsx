import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AwbStatus from './awb-status';
import AwbStatusDetail from './awb-status-detail';
import AwbStatusUpdate from './awb-status-update';
import AwbStatusDeleteDialog from './awb-status-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={AwbStatusUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={AwbStatusUpdate} />
      <Route exact path={`${match.url}/:id`} component={AwbStatusDetail} />
      <Route path={match.url} component={AwbStatus} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={AwbStatusDeleteDialog} />
  </>
);

export default Routes;
