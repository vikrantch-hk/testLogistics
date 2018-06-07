import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Awb from './awb';
import AwbDetail from './awb-detail';
import AwbUpdate from './awb-update';
import AwbDeleteDialog from './awb-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={AwbUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={AwbUpdate} />
      <Route exact path={`${match.url}/:id`} component={AwbDetail} />
      <Route path={match.url} component={Awb} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={AwbDeleteDialog} />
  </>
);

export default Routes;
