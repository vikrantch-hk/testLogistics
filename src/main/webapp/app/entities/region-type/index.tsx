import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import RegionType from './region-type';
import RegionTypeDetail from './region-type-detail';
import RegionTypeUpdate from './region-type-update';
import RegionTypeDeleteDialog from './region-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={RegionTypeUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={RegionTypeUpdate} />
      <Route exact path={`${match.url}/:id`} component={RegionTypeDetail} />
      <Route path={match.url} component={RegionType} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={RegionTypeDeleteDialog} />
  </>
);

export default Routes;
