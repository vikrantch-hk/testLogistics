import { Moment } from 'moment';

export interface IAwb {
  id?: number;
  awbNumber?: string;
  awbBarCode?: string;
  cod?: boolean;
  createDate?: Moment;
  returnAwbNumber?: string;
  returnAwbBarCode?: string;
  isBrightAwb?: boolean;
}

export const defaultValue: Readonly<IAwb> = {
  cod: false,
  isBrightAwb: false
};
