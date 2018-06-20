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

export const defaultValue: Readonly<ICourier> = {
  active: false
};
