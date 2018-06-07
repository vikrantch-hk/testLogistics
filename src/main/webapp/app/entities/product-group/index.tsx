import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductGroup from './product-group';
import ProductGroupDetail from './product-group-detail';
import ProductGroupUpdate from './product-group-update';
import ProductGroupDeleteDialog from './product-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={ProductGroupUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={ProductGroupUpdate} />
      <Route exact path={`${match.url}/:id`} component={ProductGroupDetail} />
      <Route path={match.url} component={ProductGroup} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={ProductGroupDeleteDialog} />
  </>
);

export default Routes;
