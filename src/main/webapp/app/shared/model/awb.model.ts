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

export class Awb implements IAwb {
  constructor(
    public id?: number,
    public awbNumber?: string,
    public awbBarCode?: string,
    public cod?: boolean,
    public createDate?: Moment,
    public returnAwbNumber?: string,
    public returnAwbBarCode?: string,
    public isBrightAwb?: boolean
  ) {
    this.cod = false;
    this.isBrightAwb = false;
  }
}
