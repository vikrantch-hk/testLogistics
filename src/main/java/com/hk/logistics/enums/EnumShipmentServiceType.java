package com.hk.logistics.enums;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public enum EnumShipmentServiceType {

    Prepaid_Air(10L, "prepaidAir"),
    Prepaid_Ground(20L, "prepaidGround"),
    Cod_Air(30L, "codAir"),
    Cod_Ground(40L, "codGround"),
    ReversePickup_Air(50L,"reverseAir"),
    ReversePickup_Ground(60L,"reverseGround"),
    CardOnDelivery_Air(70L, "cardOnDeliveryAir"),
    CardOnDelivery_Ground(80L, "cardOnDeliveryGround");

    private String name;
    private Long id;

    EnumShipmentServiceType(Long id, String name) {
        this.name = name;
        this.id = id;
    }

    public java.lang.String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public static EnumShipmentServiceType getShipmentTypeFromId(Long id) {
        for (EnumShipmentServiceType shipmentType : values()) {
            if (shipmentType.getId().equals(id)) return shipmentType;
        }
        return null;
    }

    public static List<EnumShipmentServiceType> getCodEnumShipmentServiceTypes() {
        return Arrays.asList(Cod_Air,Cod_Ground);
    }

    public static List<EnumShipmentServiceType> getPrepaidEnumShipmentServiceTypes() {
        return Arrays.asList(Prepaid_Air, Prepaid_Ground);
    }

    public static List<EnumShipmentServiceType> getGroundEnumShipmentServiceTypes() {
        return Arrays.asList(Prepaid_Ground,Cod_Ground, CardOnDelivery_Ground);
    }

    public static List<EnumShipmentServiceType> getAirEnumShipmentServiceTypes() {
        return Arrays.asList(Cod_Air,Prepaid_Air, CardOnDelivery_Air);
    }

    public static List<EnumShipmentServiceType> getAllShipmentServiceType() {
        return Arrays.asList(Cod_Air,Cod_Ground,Prepaid_Air,Prepaid_Ground, CardOnDelivery_Air, CardOnDelivery_Ground);
    }

    public static List<Long> getShipmentServiceTypesIds(List<EnumShipmentServiceType> enumShipmentServiceTypes) {
        List<Long> shipmentServiceTypeIds = new ArrayList<Long>();
        for (EnumShipmentServiceType enumShipmentServiceType : enumShipmentServiceTypes) {
            shipmentServiceTypeIds.add(enumShipmentServiceType.getId());
        }
        return shipmentServiceTypeIds;
    }
}
