package com.hk.logistics.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.poiji.annotation.ExcelCellName;
import com.poiji.annotation.ExcelRow;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Vendor.
 */
@Entity
@Table(name = "vendor")
public class Vendor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "short_code", nullable = false)
    @ExcelCellName("shortcode")
    private String shortCode;

    @NotNull
    @Column(name = "pincode", nullable = false)
    @ExcelCellName("Pincode")
    private String pincode;

    @OneToMany(mappedBy = "vendor")
    private Set<VendorWHCourierMapping> vendorWHCourierMappings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShortCode() {
        return shortCode;
    }

    public Vendor shortCode(String shortCode) {
        this.shortCode = shortCode;
        return this;
    }

    public void setShortCode(String shortCode) {
        this.shortCode = shortCode;
    }

    public String getPincode() {
        return pincode;
    }

    public Vendor pincode(String pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public Set<VendorWHCourierMapping> getVendorWHCourierMappings() {
        return vendorWHCourierMappings;
    }

    public Vendor vendorWHCourierMappings(Set<VendorWHCourierMapping> vendorWHCourierMappings) {
        this.vendorWHCourierMappings = vendorWHCourierMappings;
        return this;
    }

    public Vendor addVendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMappings.add(vendorWHCourierMapping);
        vendorWHCourierMapping.setVendor(this);
        return this;
    }

    public Vendor removeVendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMappings.remove(vendorWHCourierMapping);
        vendorWHCourierMapping.setVendor(null);
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
        Vendor vendor = (Vendor) o;
        if (vendor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vendor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vendor{" +
            "id=" + getId() +
            ", shortCode='" + getShortCode() + "'" +
            ", pincode='" + getPincode() + "'" +
            "}";
    }
}
