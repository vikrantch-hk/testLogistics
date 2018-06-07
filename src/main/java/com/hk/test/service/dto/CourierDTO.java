package com.hk.test.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Courier entity.
 */
public class CourierDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private Boolean active;

    private String trackingParameter;

    private String trackingUrl;

    private Long parentCourierId;

    private Set<CourierChannelDTO> courierChannels = new HashSet<>();

    private Set<CourierGroupDTO> courierGroups = new HashSet<>();

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

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getTrackingParameter() {
        return trackingParameter;
    }

    public void setTrackingParameter(String trackingParameter) {
        this.trackingParameter = trackingParameter;
    }

    public String getTrackingUrl() {
        return trackingUrl;
    }

    public void setTrackingUrl(String trackingUrl) {
        this.trackingUrl = trackingUrl;
    }

    public Long getParentCourierId() {
        return parentCourierId;
    }

    public void setParentCourierId(Long parentCourierId) {
        this.parentCourierId = parentCourierId;
    }

    public Set<CourierChannelDTO> getCourierChannels() {
        return courierChannels;
    }

    public void setCourierChannels(Set<CourierChannelDTO> courierChannels) {
        this.courierChannels = courierChannels;
    }

    public Set<CourierGroupDTO> getCourierGroups() {
        return courierGroups;
    }

    public void setCourierGroups(Set<CourierGroupDTO> courierGroups) {
        this.courierGroups = courierGroups;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CourierDTO courierDTO = (CourierDTO) o;
        if (courierDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courierDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourierDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", active='" + isActive() + "'" +
            ", trackingParameter='" + getTrackingParameter() + "'" +
            ", trackingUrl='" + getTrackingUrl() + "'" +
            ", parentCourierId=" + getParentCourierId() +
            "}";
    }
}
