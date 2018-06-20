import { ICourier } from './courier.model';

export interface ICourierGroup {
  id?: number;
  name?: string;
  couriers?: ICourier[];
}

export const defaultValue: Readonly<ICourierGroup> = {};
