import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import PincodeCourierMapping from './pincode-courier-mapping';
import PincodeCourierMappingDetail from './pincode-courier-mapping-detail';
import PincodeCourierMappingUpdate from './pincode-courier-mapping-update';
import PincodeCourierMappingDeleteDialog from './pincode-courier-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={PincodeCourierMappingUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={PincodeCourierMappingUpdate} />
      <Route exact path={`${match.url}/:id`} component={PincodeCourierMappingDetail} />
      <Route path={match.url} component={PincodeCourierMapping} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={PincodeCourierMappingDeleteDialog} />
  </>
);

export default Routes;
