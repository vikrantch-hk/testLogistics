export interface ICityCourierTAT {
  id?: number;
  turnaroundTime?: number;
}

export class CityCourierTAT implements ICityCourierTAT {
  constructor(public id?: number, public turnaroundTime?: number) {}
}
