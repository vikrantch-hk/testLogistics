import { Moment } from 'moment';
import { IVendorWHCourierMapping } from './vendor-wh-courier-mapping.model';

export interface IVendor {
  id?: number;
  name?: string;
  shortCode?: string;
  tinNo?: string;
  creditDays?: number;
  createDt?: Moment;
  email?: string;
  addressId?: number;
  billingAddressId?: number;
  active?: boolean;
  gstin?: string;
  pincode?: string;
  vendorWHCourierMappings?: IVendorWHCourierMapping[];
}

export class Vendor implements IVendor {
  constructor(
    public id?: number,
    public name?: string,
    public shortCode?: string,
    public tinNo?: string,
    public creditDays?: number,
    public createDt?: Moment,
    public email?: string,
    public addressId?: number,
    public billingAddressId?: number,
    public active?: boolean,
    public gstin?: string,
    public pincode?: string,
    public vendorWHCourierMappings?: IVendorWHCourierMapping[]
  ) {
    this.active = false;
  }
}
