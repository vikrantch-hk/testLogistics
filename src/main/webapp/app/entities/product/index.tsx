import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Product from './product';
import ProductDetail from './product-detail';
import ProductUpdate from './product-update';
import ProductDeleteDialog from './product-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={ProductUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={ProductUpdate} />
      <Route exact path={`${match.url}/:id`} component={ProductDetail} />
      <Route path={match.url} component={Product} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={ProductDeleteDialog} />
  </>
);

export default Routes;
