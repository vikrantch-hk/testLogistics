package com.hk.logistics.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Courier.
 */
@Entity
@Table(name = "courier")
public class Courier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @Column(name = "tracking_parameter")
    private String trackingParameter;

    @Column(name = "tracking_url")
    private String trackingUrl;

    @Column(name = "parent_courier_id")
    private Long parentCourierId;

    @ManyToMany
    @JoinTable(name = "courier_courier_channel",
               joinColumns = @JoinColumn(name = "couriers_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "courier_channels_id", referencedColumnName = "id"))
    private Set<CourierChannel> courierChannels = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "courier_courier_group",
               joinColumns = @JoinColumn(name = "couriers_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "courier_groups_id", referencedColumnName = "id"))
    private Set<CourierGroup> courierGroups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Courier name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isActive() {
        return active;
    }

    public Courier active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getTrackingParameter() {
        return trackingParameter;
    }

    public Courier trackingParameter(String trackingParameter) {
        this.trackingParameter = trackingParameter;
        return this;
    }

    public void setTrackingParameter(String trackingParameter) {
        this.trackingParameter = trackingParameter;
    }

    public String getTrackingUrl() {
        return trackingUrl;
    }

    public Courier trackingUrl(String trackingUrl) {
        this.trackingUrl = trackingUrl;
        return this;
    }

    public void setTrackingUrl(String trackingUrl) {
        this.trackingUrl = trackingUrl;
    }

    public Long getParentCourierId() {
        return parentCourierId;
    }

    public Courier parentCourierId(Long parentCourierId) {
        this.parentCourierId = parentCourierId;
        return this;
    }

    public void setParentCourierId(Long parentCourierId) {
        this.parentCourierId = parentCourierId;
    }

    public Set<CourierChannel> getCourierChannels() {
        return courierChannels;
    }

    public Courier courierChannels(Set<CourierChannel> courierChannels) {
        this.courierChannels = courierChannels;
        return this;
    }

    public Courier addCourierChannel(CourierChannel courierChannel) {
        this.courierChannels.add(courierChannel);
        courierChannel.getCouriers().add(this);
        return this;
    }

    public Courier removeCourierChannel(CourierChannel courierChannel) {
        this.courierChannels.remove(courierChannel);
        courierChannel.getCouriers().remove(this);
        return this;
    }

    public void setCourierChannels(Set<CourierChannel> courierChannels) {
        this.courierChannels = courierChannels;
    }

    public Set<CourierGroup> getCourierGroups() {
        return courierGroups;
    }

    public Courier courierGroups(Set<CourierGroup> courierGroups) {
        this.courierGroups = courierGroups;
        return this;
    }

    public Courier addCourierGroup(CourierGroup courierGroup) {
        this.courierGroups.add(courierGroup);
        courierGroup.getCouriers().add(this);
        return this;
    }

    public Courier removeCourierGroup(CourierGroup courierGroup) {
        this.courierGroups.remove(courierGroup);
        courierGroup.getCouriers().remove(this);
        return this;
    }

    public void setCourierGroups(Set<CourierGroup> courierGroups) {
        this.courierGroups = courierGroups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Courier courier = (Courier) o;
        if (courier.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courier.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Courier{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", active='" + isActive() + "'" +
            ", trackingParameter='" + getTrackingParameter() + "'" +
            ", trackingUrl='" + getTrackingUrl() + "'" +
            ", parentCourierId=" + getParentCourierId() +
            "}";
    }
}
