import { IVendorWHCourierMapping } from './vendor-wh-courier-mapping.model';
import { ICourier } from './courier.model';

export interface ICourierChannel {
  id?: number;
  name?: string;
  vendorWHCourierMappings?: IVendorWHCourierMapping[];
  couriers?: ICourier[];
}

export const defaultValue: Readonly<ICourierChannel> = {};
