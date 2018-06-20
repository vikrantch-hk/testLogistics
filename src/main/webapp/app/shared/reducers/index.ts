import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from './user-management';
// prettier-ignore
import vendor, {
  VendorState
} from 'app/entities/vendor/vendor.reducer';
// prettier-ignore
import regionType, {
  RegionTypeState
} from 'app/entities/region-type/region-type.reducer';
// prettier-ignore
import courierChannel, {
  CourierChannelState
} from 'app/entities/courier-channel/courier-channel.reducer';
// prettier-ignore
import courierGroup, {
  CourierGroupState
} from 'app/entities/courier-group/courier-group.reducer';
// prettier-ignore
import warehouse, {
  WarehouseState
} from 'app/entities/warehouse/warehouse.reducer';
// prettier-ignore
import courier, {
  CourierState
} from 'app/entities/courier/courier.reducer';
// prettier-ignore
import pincode, {
  PincodeState
} from 'app/entities/pincode/pincode.reducer';
// prettier-ignore
import courierPricingEngine, {
  CourierPricingEngineState
} from 'app/entities/courier-pricing-engine/courier-pricing-engine.reducer';
// prettier-ignore
import product, {
  ProductState
} from 'app/entities/product/product.reducer';
// prettier-ignore
import productSourceDestinationMapping, {
  ProductSourceDestinationMappingState
} from 'app/entities/product-source-destination-mapping/product-source-destination-mapping.reducer';
// prettier-ignore
import sourceDestinationMapping, {
  SourceDestinationMappingState
} from 'app/entities/source-destination-mapping/source-destination-mapping.reducer';
// prettier-ignore
import courierAttributes, {
  CourierAttributesState
} from 'app/entities/courier-attributes/courier-attributes.reducer';
// prettier-ignore
import vendorWHCourierMapping, {
  VendorWHCourierMappingState
} from 'app/entities/vendor-wh-courier-mapping/vendor-wh-courier-mapping.reducer';
// prettier-ignore
import awbStatus, {
  AwbStatusState
} from 'app/entities/awb-status/awb-status.reducer';
// prettier-ignore
import awb, {
  AwbState
} from 'app/entities/awb/awb.reducer';
// prettier-ignore
import city, {
  CityState
} from 'app/entities/city/city.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
// prettier-ignore
import state, {
  StateState
} from 'app/entities/state/state.reducer';
// prettier-ignore
import zone, {
  ZoneState
} from 'app/entities/zone/zone.reducer';
// prettier-ignore
import hub, {
  HubState
} from 'app/entities/hub/hub.reducer';
// prettier-ignore
import pincodeCourierMapping, {
  PincodeCourierMappingState
} from 'app/entities/pincode-courier-mapping/pincode-courier-mapping.reducer';
// prettier-ignore
import pincodeRegionZone, {
  PincodeRegionZoneState
} from 'app/entities/pincode-region-zone/pincode-region-zone.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly vendor: VendorState;
  readonly regionType: RegionTypeState;
  readonly courierChannel: CourierChannelState;
  readonly courierGroup: CourierGroupState;
  readonly warehouse: WarehouseState;
  readonly courier: CourierState;
  readonly pincode: PincodeState;
  readonly courierPricingEngine: CourierPricingEngineState;
  readonly product: ProductState;
  readonly productSourceDestinationMapping: ProductSourceDestinationMappingState;
  readonly sourceDestinationMapping: SourceDestinationMappingState;
  readonly courierAttributes: CourierAttributesState;
  readonly vendorWHCourierMapping: VendorWHCourierMappingState;
  readonly awbStatus: AwbStatusState;
  readonly awb: AwbState;
  readonly city: CityState;
  readonly country: CountryState;
  readonly state: StateState;
  readonly zone: ZoneState;
  readonly hub: HubState;
  readonly pincodeCourierMapping: PincodeCourierMappingState;
  readonly pincodeRegionZone: PincodeRegionZoneState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
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

export default rootReducer;
