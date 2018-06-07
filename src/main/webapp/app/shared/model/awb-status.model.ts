export interface IAwbStatus {
  id?: number;
  awbStatus?: string;
}

export class AwbStatus implements IAwbStatus {
  constructor(public id?: number, public awbStatus?: string) {}
}
