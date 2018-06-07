import { Moment } from 'moment';

export interface ICourierPickupInfo {
  id?: number;
  pickupConfirmationNo?: string;
  trackingNo?: string;
  pickupDate?: Moment;
  courierName?: string;
  courierId?: number;
  pickupStatusName?: string;
  pickupStatusId?: number;
}

export class CourierPickupInfo implements ICourierPickupInfo {
  constructor(
    public id?: number,
    public pickupConfirmationNo?: string,
    public trackingNo?: string,
    public pickupDate?: Moment,
    public courierName?: string,
    public courierId?: number,
    public pickupStatusName?: string,
    public pickupStatusId?: number
  ) {}
}
