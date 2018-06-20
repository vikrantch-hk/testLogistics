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
}

export const defaultValue: Readonly<ICourierAttributes> = {
  prepaidAir: false,
  prepaidGround: false,
  codAir: false,
  codGround: false,
  reverseAir: false,
  reverseGround: false,
  cardOnDeliveryAir: false,
  cardOnDeliveryGround: false
};
