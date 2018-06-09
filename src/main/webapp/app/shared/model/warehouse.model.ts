import { IVendorWHCourierMapping } from './vendor-wh-courier-mapping.model';

export interface IWarehouse {
  id?: number;
  name?: string;
  pincode?: string;
  vendorWHCourierMappings?: IVendorWHCourierMapping[];
}

export class Warehouse implements IWarehouse {
  constructor(
    public id?: number,
    public name?: string,
    public pincode?: string,
    public vendorWHCourierMappings?: IVendorWHCourierMapping[]
  ) {}
}
