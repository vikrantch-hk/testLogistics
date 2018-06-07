import { IProduct } from './product.model';

export interface IProductGroup {
  id?: number;
  name?: string;
  products?: IProduct[];
}

export class ProductGroup implements IProductGroup {
  constructor(public id?: number, public name?: string, public products?: IProduct[]) {}
}
