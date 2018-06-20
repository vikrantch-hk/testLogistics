export interface IPincodeCourierMapping {
  id?: number;
  routingCode?: string;
  applicableForCheapestCourier?: boolean;
  estimatedDeliveryDays?: number;
  pickupAvailable?: boolean;
  pincodeId?: number;
  attributesId?: number;
  vendorWHCourierMappingId?: number;
  sourceDestinationMappingId?: number;
}

export const defaultValue: Readonly<IPincodeCourierMapping> = {
  applicableForCheapestCourier: false,
  pickupAvailable: false
};
