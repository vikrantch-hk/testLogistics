package com.hk.logistics.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ProductSourceDestinationMapping entity.
 */
public class ProductSourceDestinationMappingDTO implements Serializable {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO = (ProductSourceDestinationMappingDTO) o;
        if (productSourceDestinationMappingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productSourceDestinationMappingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductSourceDestinationMappingDTO{" +
            "id=" + getId() +
            "}";
    }
}
