import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
import vendor from 'app/entities/vendor/vendor.reducer';
import regionType from 'app/entities/region-type/region-type.reducer';
import courierChannel from 'app/entities/courier-channel/courier-channel.reducer';
import courierGroup from 'app/entities/courier-group/courier-group.reducer';
import warehouse from 'app/entities/warehouse/warehouse.reducer';
import courier from 'app/entities/courier/courier.reducer';
import pincode from 'app/entities/pincode/pincode.reducer';
import courierPricingEngine from 'app/entities/courier-pricing-engine/courier-pricing-engine.reducer';
import product from 'app/entities/product/product.reducer';
import productGroup from 'app/entities/product-group/product-group.reducer';
import sourceDestinationMapping from 'app/entities/source-destination-mapping/source-destination-mapping.reducer';
import courierAttributes from 'app/entities/courier-attributes/courier-attributes.reducer';
import vendorWHCourierMapping from 'app/entities/vendor-wh-courier-mapping/vendor-wh-courier-mapping.reducer';
import awbStatus from 'app/entities/awb-status/awb-status.reducer';
import pickupStatus from 'app/entities/pickup-status/pickup-status.reducer';
import awb from 'app/entities/awb/awb.reducer';
import city from 'app/entities/city/city.reducer';
import cityCourierTAT from 'app/entities/city-courier-tat/city-courier-tat.reducer';
import country from 'app/entities/country/country.reducer';
import courierPickupInfo from 'app/entities/courier-pickup-info/courier-pickup-info.reducer';
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
  register,
  activate,
  passwordReset,
  password,
  settings,
  vendor,
  regionType,
  courierChannel,
  courierGroup,
  warehouse,
  courier,
  pincode,
  courierPricingEngine,
  product,
  productGroup,
  sourceDestinationMapping,
  courierAttributes,
  vendorWHCourierMapping,
  awbStatus,
  pickupStatus,
  awb,
  city,
  cityCourierTAT,
  country,
  courierPickupInfo,
  state,
  zone,
  hub,
  pincodeCourierMapping,
  pincodeRegionZone,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});
