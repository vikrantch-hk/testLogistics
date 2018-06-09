package com.hk.logistics.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Warehouse entity.
 */
public class WarehouseDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String pincode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
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
            ", name='" + getName() + "'" +
            ", pincode='" + getPincode() + "'" +
            "}";
    }
}
