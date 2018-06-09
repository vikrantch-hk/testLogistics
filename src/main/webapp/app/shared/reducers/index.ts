import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from './user-management';
import vendor from 'app/entities/vendor/vendor.reducer';
import regionType from 'app/entities/region-type/region-type.reducer';
import courierChannel from 'app/entities/courier-channel/courier-channel.reducer';
import courierGroup from 'app/entities/courier-group/courier-group.reducer';
import warehouse from 'app/entities/warehouse/warehouse.reducer';
import courier from 'app/entities/courier/courier.reducer';
import pincode from 'app/entities/pincode/pincode.reducer';
import courierPricingEngine from 'app/entities/courier-pricing-engine/courier-pricing-engine.reducer';
import product from 'app/entities/product/product.reducer';
import productSourceDestinationMapping from 'app/entities/product-source-destination-mapping/product-source-destination-mapping.reducer';
import sourceDestinationMapping from 'app/entities/source-destination-mapping/source-destination-mapping.reducer';
import courierAttributes from 'app/entities/courier-attributes/courier-attributes.reducer';
import vendorWHCourierMapping from 'app/entities/vendor-wh-courier-mapping/vendor-wh-courier-mapping.reducer';
import awbStatus from 'app/entities/awb-status/awb-status.reducer';
import awb from 'app/entities/awb/awb.reducer';
import city from 'app/entities/city/city.reducer';
import country from 'app/entities/country/country.reducer';
import state from 'app/entities/state/state.reducer';
import zone from 'app/entities/zone/zone.reducer';
import hub from 'app/entities/hub/hub.reducer';
import pincodeCourierMapping from 'app/entities/pincode-courier-mapping/pincode-courier-mapping.reducer';
import pincodeRegionZone from 'app/entities/pincode-region-zone/pincode-region-zone.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export default combineReducers({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  vendor,
  regionType,
  courierChannel,
  courierGroup,
  warehouse,
  courier,
  pincode,
  courierPricingEngine,
  product,
  productSourceDestinationMapping,
  sourceDestinationMapping,
  courierAttributes,
  vendorWHCourierMapping,
  awbStatus,
  awb,
  city,
  country,
  state,
  zone,
  hub,
  pincodeCourierMapping,
  pincodeRegionZone,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});
