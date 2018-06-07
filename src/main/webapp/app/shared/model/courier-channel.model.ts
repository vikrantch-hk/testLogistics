import { IVendorWHCourierMapping } from './vendor-wh-courier-mapping.model';
import { ICourier } from './courier.model';

export interface ICourierChannel {
  id?: number;
  name?: string;
  vendorWHCourierMappings?: IVendorWHCourierMapping[];
  couriers?: ICourier[];
}

export class CourierChannel implements ICourierChannel {
  constructor(
    public id?: number,
    public name?: string,
    public vendorWHCourierMappings?: IVendorWHCourierMapping[],
    public couriers?: ICourier[]
  ) {}
}
