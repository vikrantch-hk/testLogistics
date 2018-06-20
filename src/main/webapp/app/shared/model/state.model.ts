export interface IState {
  id?: number;
  name?: string;
  identifier?: string;
  unionTerritory?: boolean;
}

export const defaultValue: Readonly<IState> = {
  unionTerritory: false
};
