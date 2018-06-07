import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Hub from './hub';
import HubDetail from './hub-detail';
import HubUpdate from './hub-update';
import HubDeleteDialog from './hub-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={HubUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={HubUpdate} />
      <Route exact path={`${match.url}/:id`} component={HubDetail} />
      <Route path={match.url} component={Hub} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={HubDeleteDialog} />
  </>
);

export default Routes;
