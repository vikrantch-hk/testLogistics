package com.hk.test.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the PincodeCourierMapping entity.
 */
public class PincodeCourierMappingDTO implements Serializable {

    private Long id;

    private String routingCode;

    @NotNull
    private Boolean applicableForCheapestCourier;

    private Double estimatedDeliveryDays;

    @NotNull
    private Boolean pickupAvailable;

    private Long pincodeId;

    private Long attributesId;

    private Long productGroupId;

    private String productGroupName;

    private Long vendorWHCourierMappingId;

    private Long sourceDestinationMappingId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoutingCode() {
        return routingCode;
    }

    public void setRoutingCode(String routingCode) {
        this.routingCode = routingCode;
    }

    public Boolean isApplicableForCheapestCourier() {
        return applicableForCheapestCourier;
    }

    public void setApplicableForCheapestCourier(Boolean applicableForCheapestCourier) {
        this.applicableForCheapestCourier = applicableForCheapestCourier;
    }

    public Double getEstimatedDeliveryDays() {
        return estimatedDeliveryDays;
    }

    public void setEstimatedDeliveryDays(Double estimatedDeliveryDays) {
        this.estimatedDeliveryDays = estimatedDeliveryDays;
    }

    public Boolean isPickupAvailable() {
        return pickupAvailable;
    }

    public void setPickupAvailable(Boolean pickupAvailable) {
        this.pickupAvailable = pickupAvailable;
    }

    public Long getPincodeId() {
        return pincodeId;
    }

    public void setPincodeId(Long pincodeId) {
        this.pincodeId = pincodeId;
    }

    public Long getAttributesId() {
        return attributesId;
    }

    public void setAttributesId(Long courierAttributesId) {
        this.attributesId = courierAttributesId;
    }

    public Long getProductGroupId() {
        return productGroupId;
    }

    public void setProductGroupId(Long productGroupId) {
        this.productGroupId = productGroupId;
    }

    public String getProductGroupName() {
        return productGroupName;
    }

    public void setProductGroupName(String productGroupName) {
        this.productGroupName = productGroupName;
    }

    public Long getVendorWHCourierMappingId() {
        return vendorWHCourierMappingId;
    }

    public void setVendorWHCourierMappingId(Long vendorWHCourierMappingId) {
        this.vendorWHCourierMappingId = vendorWHCourierMappingId;
    }

    public Long getSourceDestinationMappingId() {
        return sourceDestinationMappingId;
    }

    public void setSourceDestinationMappingId(Long sourceDestinationMappingId) {
        this.sourceDestinationMappingId = sourceDestinationMappingId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PincodeCourierMappingDTO pincodeCourierMappingDTO = (PincodeCourierMappingDTO) o;
        if (pincodeCourierMappingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pincodeCourierMappingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PincodeCourierMappingDTO{" +
            "id=" + getId() +
            ", routingCode='" + getRoutingCode() + "'" +
            ", applicableForCheapestCourier='" + isApplicableForCheapestCourier() + "'" +
            ", estimatedDeliveryDays=" + getEstimatedDeliveryDays() +
            ", pickupAvailable='" + isPickupAvailable() + "'" +
            ", pincode=" + getPincodeId() +
            ", attributes=" + getAttributesId() +
            ", productGroup=" + getProductGroupId() +
            ", productGroup='" + getProductGroupName() + "'" +
            ", vendorWHCourierMapping=" + getVendorWHCourierMappingId() +
            ", sourceDestinationMapping=" + getSourceDestinationMappingId() +
            "}";
    }
}
