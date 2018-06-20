export interface ICountry {
  id?: number;
  name?: string;
  countryCode?: string;
}

export const defaultValue: Readonly<ICountry> = {};
