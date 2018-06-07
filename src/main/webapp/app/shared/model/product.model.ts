export interface IProduct {
  id?: number;
  name?: string;
  productGroupId?: number;
}

export class Product implements IProduct {
  constructor(public id?: number, public name?: string, public productGroupId?: number) {}
}
