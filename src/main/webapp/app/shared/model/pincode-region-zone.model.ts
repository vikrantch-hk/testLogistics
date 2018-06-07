export interface IPincodeRegionZone {
  id?: number;
  regionTypeName?: string;
  regionTypeId?: number;
  courierGroupName?: string;
  courierGroupId?: number;
  vendorWHCourierMappingId?: number;
}

export class PincodeRegionZone implements IPincodeRegionZone {
  constructor(
    public id?: number,
    public regionTypeName?: string,
    public regionTypeId?: number,
    public courierGroupName?: string,
    public courierGroupId?: number,
    public vendorWHCourierMappingId?: number
  ) {}
}
