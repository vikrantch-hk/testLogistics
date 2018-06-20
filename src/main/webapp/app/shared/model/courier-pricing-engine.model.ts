import { Moment } from 'moment';

export interface ICourierPricingEngine {
  id?: number;
  firstBaseWt?: number;
  firstBaseCost?: number;
  secondBaseWt?: number;
  secondBaseCost?: number;
  additionalWt?: number;
  additionalCost?: number;
  fuelSurcharge?: number;
  minCodCharges?: number;
  codCutoffAmount?: number;
  variableCodCharges?: number;
  validUpto?: Moment;
  courierName?: string;
  courierId?: number;
  warehouseName?: string;
  warehouseId?: number;
  regionTypeName?: string;
  regionTypeId?: number;
}

export const defaultValue: Readonly<ICourierPricingEngine> = {};
