import { ICourierChannel } from './courier-channel.model';
import { ICourierGroup } from './courier-group.model';

export interface ICourier {
  id?: number;
  name?: string;
  active?: boolean;
  trackingParameter?: string;
  trackingUrl?: string;
  parentCourierId?: number;
  courierChannels?: ICourierChannel[];
  courierGroups?: ICourierGroup[];
}

export class Courier implements ICourier {
  constructor(
    public id?: number,
    public name?: string,
    public active?: boolean,
    public trackingParameter?: string,
    public trackingUrl?: string,
    public parentCourierId?: number,
    public courierChannels?: ICourierChannel[],
    public courierGroups?: ICourierGroup[]
  ) {
    this.active = false;
  }
}
