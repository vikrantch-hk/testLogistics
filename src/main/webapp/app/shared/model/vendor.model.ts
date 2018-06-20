import { IVendorWHCourierMapping } from './vendor-wh-courier-mapping.model';

export interface IVendor {
  id?: number;
  name?: string;
  pincode?: string;
  vendorWHCourierMappings?: IVendorWHCourierMapping[];
}

export const defaultValue: Readonly<IVendor> = {};
