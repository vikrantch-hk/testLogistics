export interface IPincode {
  id?: number;
  pincode?: string;
  region?: string;
  locality?: string;
  lastMileCost?: number;
  tier?: string;
  cityName?: string;
  cityId?: number;
  stateName?: string;
  stateId?: number;
  zoneName?: string;
  zoneId?: number;
  hubName?: string;
  hubId?: number;
}

export const defaultValue: Readonly<IPincode> = {};
