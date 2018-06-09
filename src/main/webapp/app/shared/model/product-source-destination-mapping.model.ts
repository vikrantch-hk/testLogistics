export interface IProductSourceDestinationMapping {
  id?: number;
}

export class ProductSourceDestinationMapping implements IProductSourceDestinationMapping {
  constructor(public id?: number) {}
}
