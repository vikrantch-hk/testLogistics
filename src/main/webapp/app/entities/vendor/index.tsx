import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Vendor from './vendor';
import VendorDetail from './vendor-detail';
import VendorUpdate from './vendor-update';
import VendorDeleteDialog from './vendor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={VendorUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={VendorUpdate} />
      <Route exact path={`${match.url}/:id`} component={VendorDetail} />
      <Route path={match.url} component={Vendor} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={VendorDeleteDialog} />
  </>
);

export default Routes;
