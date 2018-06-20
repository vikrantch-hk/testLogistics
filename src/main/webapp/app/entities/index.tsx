import * as React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Vendor from './vendor';
import RegionType from './region-type';
import CourierChannel from './courier-channel';
import CourierGroup from './courier-group';
import Warehouse from './warehouse';
import Courier from './courier';
import Pincode from './pincode';
import CourierPricingEngine from './courier-pricing-engine';
import Product from './product';
import ProductSourceDestinationMapping from './product-source-destination-mapping';
import SourceDestinationMapping from './source-destination-mapping';
import CourierAttributes from './courier-attributes';
import VendorWHCourierMapping from './vendor-wh-courier-mapping';
import AwbStatus from './awb-status';
import Awb from './awb';
import City from './city';
import Country from './country';
import State from './state';
import Zone from './zone';
import Hub from './hub';
import PincodeCourierMapping from './pincode-courier-mapping';
import PincodeRegionZone from './pincode-region-zone';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/vendor`} component={Vendor} />
      <ErrorBoundaryRoute path={`${match.url}/region-type`} component={RegionType} />
      <ErrorBoundaryRoute path={`${match.url}/courier-channel`} component={CourierChannel} />
      <ErrorBoundaryRoute path={`${match.url}/courier-group`} component={CourierGroup} />
      <ErrorBoundaryRoute path={`${match.url}/warehouse`} component={Warehouse} />
      <ErrorBoundaryRoute path={`${match.url}/courier`} component={Courier} />
      <ErrorBoundaryRoute path={`${match.url}/pincode`} component={Pincode} />
      <ErrorBoundaryRoute path={`${match.url}/courier-pricing-engine`} component={CourierPricingEngine} />
      <ErrorBoundaryRoute path={`${match.url}/product`} component={Product} />
      <ErrorBoundaryRoute path={`${match.url}/product-source-destination-mapping`} component={ProductSourceDestinationMapping} />
      <ErrorBoundaryRoute path={`${match.url}/source-destination-mapping`} component={SourceDestinationMapping} />
      <ErrorBoundaryRoute path={`${match.url}/courier-attributes`} component={CourierAttributes} />
      <ErrorBoundaryRoute path={`${match.url}/vendor-wh-courier-mapping`} component={VendorWHCourierMapping} />
      <ErrorBoundaryRoute path={`${match.url}/awb-status`} component={AwbStatus} />
      <ErrorBoundaryRoute path={`${match.url}/awb`} component={Awb} />
      <ErrorBoundaryRoute path={`${match.url}/city`} component={City} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      <ErrorBoundaryRoute path={`${match.url}/state`} component={State} />
      <ErrorBoundaryRoute path={`${match.url}/zone`} component={Zone} />
      <ErrorBoundaryRoute path={`${match.url}/hub`} component={Hub} />
      <ErrorBoundaryRoute path={`${match.url}/pincode-courier-mapping`} component={PincodeCourierMapping} />
      <ErrorBoundaryRoute path={`${match.url}/pincode-region-zone`} component={PincodeRegionZone} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
