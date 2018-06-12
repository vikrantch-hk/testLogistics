import { IVendorWHCourierMapping } from './vendor-wh-courier-mapping.model';

export interface IVendor {
  id?: number;
  shortCode?: string;
  pincode?: string;
  vendorWHCourierMappings?: IVendorWHCourierMapping[];
}

export class Vendor implements IVendor {
  constructor(
    public id?: number,
    public shortCode?: string,
    public pincode?: string,
    public vendorWHCourierMappings?: IVendorWHCourierMapping[]
  ) {}
}
