export interface IPickupStatus {
  id?: number;
  name?: string;
}

export class PickupStatus implements IPickupStatus {
  constructor(public id?: number, public name?: string) {}
}
