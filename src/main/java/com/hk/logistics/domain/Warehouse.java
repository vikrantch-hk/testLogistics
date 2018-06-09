package com.hk.logistics.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Warehouse.
 */
@Entity
@Table(name = "warehouse")
public class Warehouse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "pincode", nullable = false)
    private String pincode;

    @OneToMany(mappedBy = "warehouse")
    private Set<VendorWHCourierMapping> vendorWHCourierMappings = new HashSet<>();

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

    public Warehouse name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPincode() {
        return pincode;
    }

    public Warehouse pincode(String pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Set<VendorWHCourierMapping> getVendorWHCourierMappings() {
        return vendorWHCourierMappings;
    }

    public Warehouse vendorWHCourierMappings(Set<VendorWHCourierMapping> vendorWHCourierMappings) {
        this.vendorWHCourierMappings = vendorWHCourierMappings;
        return this;
    }

    public Warehouse addVendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMappings.add(vendorWHCourierMapping);
        vendorWHCourierMapping.setWarehouse(this);
        return this;
    }

    public Warehouse removeVendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMappings.remove(vendorWHCourierMapping);
        vendorWHCourierMapping.setWarehouse(null);
        return this;
    }

    public void setVendorWHCourierMappings(Set<VendorWHCourierMapping> vendorWHCourierMappings) {
        this.vendorWHCourierMappings = vendorWHCourierMappings;
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
        Warehouse warehouse = (Warehouse) o;
        if (warehouse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Warehouse{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", pincode='" + getPincode() + "'" +
            "}";
    }
}
