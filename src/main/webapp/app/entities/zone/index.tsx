import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Zone from './zone';
import ZoneDetail from './zone-detail';
import ZoneUpdate from './zone-update';
import ZoneDeleteDialog from './zone-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={ZoneUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={ZoneUpdate} />
      <Route exact path={`${match.url}/:id`} component={ZoneDetail} />
      <Route path={match.url} component={Zone} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={ZoneDeleteDialog} />
  </>
);

export default Routes;
