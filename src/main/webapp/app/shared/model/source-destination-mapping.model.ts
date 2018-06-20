export interface ISourceDestinationMapping {
  id?: number;
  sourcePincode?: string;
  destinationPincode?: string;
  productName?: string;
  productId?: number;
}

export const defaultValue: Readonly<ISourceDestinationMapping> = {};
