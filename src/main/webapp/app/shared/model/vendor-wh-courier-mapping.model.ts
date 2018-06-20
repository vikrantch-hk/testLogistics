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

export const defaultValue: Readonly<IVendorWHCourierMapping> = {
  active: false
};
