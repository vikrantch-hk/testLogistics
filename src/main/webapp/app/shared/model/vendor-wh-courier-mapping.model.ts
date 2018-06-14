export interface IVendorWHCourierMapping {
  id?: number;
  active?: boolean;
  vendorName?: string;
  vendorId?: number;
  warehouseName?: string;
  warehouseId?: number;
  courierChannelName?: string;
  courierChannelId?: number;
}

export class VendorWHCourierMapping implements IVendorWHCourierMapping {
  constructor(
    public id?: number,
    public active?: boolean,
    public vendorName?: string,
    public vendorId?: number,
    public warehouseName?: string,
    public warehouseId?: number,
    public courierChannelName?: string,
    public courierChannelId?: number
  ) {
    this.active = false;
  }
}
