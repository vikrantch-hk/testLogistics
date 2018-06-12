export interface ICourierAttributes {
  id?: number;
  prepaidAir?: boolean;
  prepaidGround?: boolean;
  codAir?: boolean;
  codGround?: boolean;
  reverseAir?: boolean;
  reverseGround?: boolean;
  cardOnDeliveryAir?: boolean;
  cardOnDeliveryGround?: boolean;
  hkShipping?: boolean;
  vendorShipping?: boolean;
  reversePickup?: boolean;
}

export class CourierAttributes implements ICourierAttributes {
  constructor(
    public id?: number,
    public prepaidAir?: boolean,
    public prepaidGround?: boolean,
    public codAir?: boolean,
    public codGround?: boolean,
    public reverseAir?: boolean,
    public reverseGround?: boolean,
    public cardOnDeliveryAir?: boolean,
    public cardOnDeliveryGround?: boolean,
    public hkShipping?: boolean,
    public vendorShipping?: boolean,
    public reversePickup?: boolean
  ) {
    this.prepaidAir = false;
    this.prepaidGround = false;
    this.codAir = false;
    this.codGround = false;
    this.reverseAir = false;
    this.reverseGround = false;
    this.cardOnDeliveryAir = false;
    this.cardOnDeliveryGround = false;
    this.hkShipping = false;
    this.vendorShipping = false;
    this.reversePickup = false;
  }
}
