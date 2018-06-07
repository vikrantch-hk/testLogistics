import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Pincode from './pincode';
import PincodeDetail from './pincode-detail';
import PincodeUpdate from './pincode-update';
import PincodeDeleteDialog from './pincode-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={PincodeUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={PincodeUpdate} />
      <Route exact path={`${match.url}/:id`} component={PincodeDetail} />
      <Route path={match.url} component={Pincode} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={PincodeDeleteDialog} />
  </>
);

export default Routes;
