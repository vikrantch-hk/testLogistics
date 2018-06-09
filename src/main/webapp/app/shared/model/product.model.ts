export interface IProduct {
  id?: number;
  name?: string;
  isServiceable?: boolean;
}

export class Product implements IProduct {
  constructor(public id?: number, public name?: string, public isServiceable?: boolean) {
    this.isServiceable = false;
  }
}
