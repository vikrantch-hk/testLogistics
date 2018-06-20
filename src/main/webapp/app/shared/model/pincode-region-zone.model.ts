export interface IPincodeRegionZone {
  id?: number;
  regionTypeName?: string;
  regionTypeId?: number;
  courierGroupName?: string;
  courierGroupId?: number;
  vendorWHCourierMappingId?: number;
}

export const defaultValue: Readonly<IPincodeRegionZone> = {};
