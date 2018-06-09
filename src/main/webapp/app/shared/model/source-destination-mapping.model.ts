export interface ISourceDestinationMapping {
  id?: number;
  sourcePincode?: string;
  destinationPincode?: string;
  productName?: string;
  productId?: number;
}

export class SourceDestinationMapping implements ISourceDestinationMapping {
  constructor(
    public id?: number,
    public sourcePincode?: string,
    public destinationPincode?: string,
    public productName?: string,
    public productId?: number
  ) {}
}
