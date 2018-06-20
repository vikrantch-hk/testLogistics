import { IPincode } from './pincode.model';

export interface IHub {
  id?: number;
  name?: string;
  address?: string;
  country?: string;
  pinCodes?: IPincode[];
}

export const defaultValue: Readonly<IHub> = {};
