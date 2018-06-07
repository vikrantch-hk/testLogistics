package com.hk.test.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Warehouse entity.
 */
public class WarehouseDTO implements Serializable {

    private Long id;

    @NotNull
    private String tin;

    @NotNull
    private String identifier;

    @NotNull
    private String name;

    private String line1;

    private String line2;

    @NotNull
    private String city;

    @NotNull
    private String pincode;

    private String whPhone;

    @NotNull
    private Long warehouseType;

    @NotNull
    private Boolean honoringB2COrders;

    @NotNull
    private Boolean active;

    @NotNull
    private String prefixInvoiceGeneration;

    private String fulfilmentCenterCode;

    private Boolean storeDelivery;

    private String gstin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getWhPhone() {
        return whPhone;
    }

    public void setWhPhone(String whPhone) {
        this.whPhone = whPhone;
    }

    public Long getWarehouseType() {
        return warehouseType;
    }

    public void setWarehouseType(Long warehouseType) {
        this.warehouseType = warehouseType;
    }

    public Boolean isHonoringB2COrders() {
        return honoringB2COrders;
    }

    public void setHonoringB2COrders(Boolean honoringB2COrders) {
        this.honoringB2COrders = honoringB2COrders;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getPrefixInvoiceGeneration() {
        return prefixInvoiceGeneration;
    }

    public void setPrefixInvoiceGeneration(String prefixInvoiceGeneration) {
        this.prefixInvoiceGeneration = prefixInvoiceGeneration;
    }

    public String getFulfilmentCenterCode() {
        return fulfilmentCenterCode;
    }

    public void setFulfilmentCenterCode(String fulfilmentCenterCode) {
        this.fulfilmentCenterCode = fulfilmentCenterCode;
    }

    public Boolean isStoreDelivery() {
        return storeDelivery;
    }

    public void setStoreDelivery(Boolean storeDelivery) {
        this.storeDelivery = storeDelivery;
    }

    public String getGstin() {
        return gstin;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        WarehouseDTO warehouseDTO = (WarehouseDTO) o;
        if (warehouseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WarehouseDTO{" +
            "id=" + getId() +
            ", tin='" + getTin() + "'" +
            ", identifier='" + getIdentifier() + "'" +
            ", name='" + getName() + "'" +
            ", line1='" + getLine1() + "'" +
            ", line2='" + getLine2() + "'" +
            ", city='" + getCity() + "'" +
            ", pincode='" + getPincode() + "'" +
            ", whPhone='" + getWhPhone() + "'" +
            ", warehouseType=" + getWarehouseType() +
            ", honoringB2COrders='" + isHonoringB2COrders() + "'" +
            ", active='" + isActive() + "'" +
            ", prefixInvoiceGeneration='" + getPrefixInvoiceGeneration() + "'" +
            ", fulfilmentCenterCode='" + getFulfilmentCenterCode() + "'" +
            ", storeDelivery='" + isStoreDelivery() + "'" +
            ", gstin='" + getGstin() + "'" +
            "}";
    }
}
