export interface IProduct {
  id?: number;
  name?: string;
  isServiceable?: boolean;
}

export const defaultValue: Readonly<IProduct> = {
  isServiceable: false
};
