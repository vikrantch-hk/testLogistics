import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import SourceDestinationMapping from './source-destination-mapping';
import SourceDestinationMappingDetail from './source-destination-mapping-detail';
import SourceDestinationMappingUpdate from './source-destination-mapping-update';
import SourceDestinationMappingDeleteDialog from './source-destination-mapping-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={SourceDestinationMappingUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={SourceDestinationMappingUpdate} />
      <Route exact path={`${match.url}/:id`} component={SourceDestinationMappingDetail} />
      <Route path={match.url} component={SourceDestinationMapping} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={SourceDestinationMappingDeleteDialog} />
  </>
);

export default Routes;
