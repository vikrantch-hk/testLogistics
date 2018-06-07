package com.hk.test.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the PickupStatus entity.
 */
public class PickupStatusDTO implements Serializable {

    private Long id;

    private String name;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PickupStatusDTO pickupStatusDTO = (PickupStatusDTO) o;
        if (pickupStatusDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pickupStatusDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PickupStatusDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
