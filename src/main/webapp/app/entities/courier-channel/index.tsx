import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourierChannel from './courier-channel';
import CourierChannelDetail from './courier-channel-detail';
import CourierChannelUpdate from './courier-channel-update';
import CourierChannelDeleteDialog from './courier-channel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CourierChannelUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CourierChannelUpdate} />
      <Route exact path={`${match.url}/:id`} component={CourierChannelDetail} />
      <Route path={match.url} component={CourierChannel} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CourierChannelDeleteDialog} />
  </>
);

export default Routes;
