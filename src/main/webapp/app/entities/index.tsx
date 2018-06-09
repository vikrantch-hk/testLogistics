import * as React from 'react';
// tslint:disable-next-line:no-unused-variable
import { Route, Switch } from 'react-router-dom';

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
      <Route path={`${match.url}/vendor`} component={Vendor} />
      <Route path={`${match.url}/region-type`} component={RegionType} />
      <Route path={`${match.url}/courier-channel`} component={CourierChannel} />
      <Route path={`${match.url}/courier-group`} component={CourierGroup} />
      <Route path={`${match.url}/warehouse`} component={Warehouse} />
      <Route path={`${match.url}/courier`} component={Courier} />
      <Route path={`${match.url}/pincode`} component={Pincode} />
      <Route path={`${match.url}/courier-pricing-engine`} component={CourierPricingEngine} />
      <Route path={`${match.url}/product`} component={Product} />
      <Route path={`${match.url}/product-source-destination-mapping`} component={ProductSourceDestinationMapping} />
      <Route path={`${match.url}/source-destination-mapping`} component={SourceDestinationMapping} />
      <Route path={`${match.url}/courier-attributes`} component={CourierAttributes} />
      <Route path={`${match.url}/vendor-wh-courier-mapping`} component={VendorWHCourierMapping} />
      <Route path={`${match.url}/awb-status`} component={AwbStatus} />
      <Route path={`${match.url}/awb`} component={Awb} />
      <Route path={`${match.url}/city`} component={City} />
      <Route path={`${match.url}/country`} component={Country} />
      <Route path={`${match.url}/state`} component={State} />
      <Route path={`${match.url}/zone`} component={Zone} />
      <Route path={`${match.url}/hub`} component={Hub} />
      <Route path={`${match.url}/pincode-courier-mapping`} component={PincodeCourierMapping} />
      <Route path={`${match.url}/pincode-region-zone`} component={PincodeRegionZone} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
