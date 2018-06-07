import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import VendorWHCourierMapping from './vendor-wh-courier-mapping';
import VendorWHCourierMappingDetail from './vendor-wh-courier-mapping-detail';
import VendorWHCourierMappingUpdate from './vendor-wh-courier-mapping-update';
import VendorWHCourierMappingDeleteDialog from './vendor-wh-courier-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={VendorWHCourierMappingUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={VendorWHCourierMappingUpdate} />
      <Route exact path={`${match.url}/:id`} component={VendorWHCourierMappingDetail} />
      <Route path={match.url} component={VendorWHCourierMapping} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={VendorWHCourierMappingDeleteDialog} />
  </>
);

export default Routes;
