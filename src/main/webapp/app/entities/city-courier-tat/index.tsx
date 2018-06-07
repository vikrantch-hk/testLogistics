import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CityCourierTAT from './city-courier-tat';
import CityCourierTATDetail from './city-courier-tat-detail';
import CityCourierTATUpdate from './city-courier-tat-update';
import CityCourierTATDeleteDialog from './city-courier-tat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CityCourierTATUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CityCourierTATUpdate} />
      <Route exact path={`${match.url}/:id`} component={CityCourierTATDetail} />
      <Route path={match.url} component={CityCourierTAT} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CityCourierTATDeleteDialog} />
  </>
);

export default Routes;
