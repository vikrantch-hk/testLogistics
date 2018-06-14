import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Channel from './channel';
import ChannelDetail from './channel-detail';
import ChannelUpdate from './channel-update';
import ChannelDeleteDialog from './channel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={ChannelUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={ChannelUpdate} />
      <Route exact path={`${match.url}/:id`} component={ChannelDetail} />
      <Route path={match.url} component={Channel} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={ChannelDeleteDialog} />
  </>
);

export default Routes;
