package com.hk.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CourierChannel.
 */
@Entity
@Table(name = "courier_channel")
public class CourierChannel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "courierChannel")
    private Set<VendorWHCourierMapping> vendorWHCourierMappings = new HashSet<>();

    @ManyToMany(mappedBy = "courierChannels")
    @JsonIgnore
    private Set<Courier> couriers = new HashSet<>();

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

    public CourierChannel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<VendorWHCourierMapping> getVendorWHCourierMappings() {
        return vendorWHCourierMappings;
    }

    public CourierChannel vendorWHCourierMappings(Set<VendorWHCourierMapping> vendorWHCourierMappings) {
        this.vendorWHCourierMappings = vendorWHCourierMappings;
        return this;
    }

    public CourierChannel addVendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMappings.add(vendorWHCourierMapping);
        vendorWHCourierMapping.setCourierChannel(this);
        return this;
    }

    public CourierChannel removeVendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMappings.remove(vendorWHCourierMapping);
        vendorWHCourierMapping.setCourierChannel(null);
        return this;
    }

    public void setVendorWHCourierMappings(Set<VendorWHCourierMapping> vendorWHCourierMappings) {
        this.vendorWHCourierMappings = vendorWHCourierMappings;
    }

    public Set<Courier> getCouriers() {
        return couriers;
    }

    public CourierChannel couriers(Set<Courier> couriers) {
        this.couriers = couriers;
        return this;
    }

    public CourierChannel addCourier(Courier courier) {
        this.couriers.add(courier);
        courier.getCourierChannels().add(this);
        return this;
    }

    public CourierChannel removeCourier(Courier courier) {
        this.couriers.remove(courier);
        courier.getCourierChannels().remove(this);
        return this;
    }

    public void setCouriers(Set<Courier> couriers) {
        this.couriers = couriers;
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
        CourierChannel courierChannel = (CourierChannel) o;
        if (courierChannel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courierChannel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourierChannel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
