package com.hk.logistics.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the VendorWHCourierMapping entity.
 */
public class VendorWHCourierMappingDTO implements Serializable {

    private Long id;

    @NotNull
    private Boolean active;

    private Long vendorId;

    private String vendorShortCode;

    private Long warehouseId;

    private String warehouseName;

    private Long courierChannelId;

    private String courierChannelName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getVendorId() {
        return vendorId;
    }

    public void setVendorId(Long vendorId) {
        this.vendorId = vendorId;
    }

    public String getVendorShortCode() {
        return vendorShortCode;
    }

    public void setVendorShortCode(String vendorShortCode) {
        this.vendorShortCode = vendorShortCode;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getWarehouseName() {
        return warehouseName;
    }

    public void setWarehouseName(String warehouseName) {
        this.warehouseName = warehouseName;
    }

    public Long getCourierChannelId() {
        return courierChannelId;
    }

    public void setCourierChannelId(Long courierChannelId) {
        this.courierChannelId = courierChannelId;
    }

    public String getCourierChannelName() {
        return courierChannelName;
    }

    public void setCourierChannelName(String courierChannelName) {
        this.courierChannelName = courierChannelName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VendorWHCourierMappingDTO vendorWHCourierMappingDTO = (VendorWHCourierMappingDTO) o;
        if (vendorWHCourierMappingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vendorWHCourierMappingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VendorWHCourierMappingDTO{" +
            "id=" + getId() +
            ", active='" + isActive() + "'" +
            ", vendor=" + getVendorId() +
            ", vendor='" + getVendorShortCode() + "'" +
            ", warehouse=" + getWarehouseId() +
            ", warehouse='" + getWarehouseName() + "'" +
            ", courierChannel=" + getCourierChannelId() +
            ", courierChannel='" + getCourierChannelName() + "'" +
            "}";
    }
}
