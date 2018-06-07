import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CourierAttributes from './courier-attributes';
import CourierAttributesDetail from './courier-attributes-detail';
import CourierAttributesUpdate from './courier-attributes-update';
import CourierAttributesDeleteDialog from './courier-attributes-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <Route exact path={`${match.url}/new`} component={CourierAttributesUpdate} />
      <Route exact path={`${match.url}/:id/edit`} component={CourierAttributesUpdate} />
      <Route exact path={`${match.url}/:id`} component={CourierAttributesDetail} />
      <Route path={match.url} component={CourierAttributes} />
    </Switch>
    <Route path={`${match.url}/:id/delete`} component={CourierAttributesDeleteDialog} />
  </>
);

export default Routes;
