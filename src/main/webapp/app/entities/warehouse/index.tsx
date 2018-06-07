import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Warehouse from './warehouse';
import WarehouseDetail from './warehouse-detail';
import WarehouseUpdate from './warehouse-update';
import WarehouseDeleteDialog from './warehouse-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={WarehouseUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={WarehouseUpdate} />
      <Route exact path={`${match.url}/:id`} component={WarehouseDetail} />
      <Route path={match.url} component={Warehouse} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={WarehouseDeleteDialog} />
  </>
);

export default Routes;
