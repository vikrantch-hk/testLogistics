export interface IPincodeCourierMapping {
  id?: number;
  routingCode?: string;
  applicableForCheapestCourier?: boolean;
  estimatedDeliveryDays?: number;
  pickupAvailable?: boolean;
  pincodeId?: number;
  vendorWHCourierMappingId?: number;
  sourceDestinationMappingId?: number;
}

export class PincodeCourierMapping implements IPincodeCourierMapping {
  constructor(
    public id?: number,
    public routingCode?: string,
    public applicableForCheapestCourier?: boolean,
    public estimatedDeliveryDays?: number,
    public pickupAvailable?: boolean,
    public pincodeId?: number,
    public vendorWHCourierMappingId?: number,
    public sourceDestinationMappingId?: number
  ) {
    this.applicableForCheapestCourier = false;
    this.pickupAvailable = false;
  }
}
