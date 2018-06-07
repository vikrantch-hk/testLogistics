import { IVendorWHCourierMapping } from './vendor-wh-courier-mapping.model';

export interface IWarehouse {
  id?: number;
  tin?: string;
  identifier?: string;
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  pincode?: string;
  whPhone?: string;
  warehouseType?: number;
  honoringB2COrders?: boolean;
  active?: boolean;
  prefixInvoiceGeneration?: string;
  fulfilmentCenterCode?: string;
  storeDelivery?: boolean;
  gstin?: string;
  vendorWHCourierMappings?: IVendorWHCourierMapping[];
}

export class Warehouse implements IWarehouse {
  constructor(
    public id?: number,
    public tin?: string,
    public identifier?: string,
    public name?: string,
    public line1?: string,
    public line2?: string,
    public city?: string,
    public pincode?: string,
    public whPhone?: string,
    public warehouseType?: number,
    public honoringB2COrders?: boolean,
    public active?: boolean,
    public prefixInvoiceGeneration?: string,
    public fulfilmentCenterCode?: string,
    public storeDelivery?: boolean,
    public gstin?: string,
    public vendorWHCourierMappings?: IVendorWHCourierMapping[]
  ) {
    this.honoringB2COrders = false;
    this.active = false;
    this.storeDelivery = false;
  }
}
