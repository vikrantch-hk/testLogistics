package com.hk.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
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
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "short_code")
    private String shortCode;

    @NotNull
    @Column(name = "tin_no", nullable = false)
    private String tinNo;

    @NotNull
    @Column(name = "credit_days", nullable = false)
    private Integer creditDays;

    @NotNull
    @Column(name = "create_dt", nullable = false)
    private LocalDate createDt;

    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "address_id", nullable = false)
    private Long addressId;

    @NotNull
    @Column(name = "billing_address_id", nullable = false)
    private Long billingAddressId;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @Column(name = "gstin")
    private String gstin;

    @NotNull
    @Column(name = "pincode", nullable = false)
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

    public String getName() {
        return name;
    }

    public Vendor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getTinNo() {
        return tinNo;
    }

    public Vendor tinNo(String tinNo) {
        this.tinNo = tinNo;
        return this;
    }

    public void setTinNo(String tinNo) {
        this.tinNo = tinNo;
    }

    public Integer getCreditDays() {
        return creditDays;
    }

    public Vendor creditDays(Integer creditDays) {
        this.creditDays = creditDays;
        return this;
    }

    public void setCreditDays(Integer creditDays) {
        this.creditDays = creditDays;
    }

    public LocalDate getCreateDt() {
        return createDt;
    }

    public Vendor createDt(LocalDate createDt) {
        this.createDt = createDt;
        return this;
    }

    public void setCreateDt(LocalDate createDt) {
        this.createDt = createDt;
    }

    public String getEmail() {
        return email;
    }

    public Vendor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getAddressId() {
        return addressId;
    }

    public Vendor addressId(Long addressId) {
        this.addressId = addressId;
        return this;
    }

    public void setAddressId(Long addressId) {
        this.addressId = addressId;
    }

    public Long getBillingAddressId() {
        return billingAddressId;
    }

    public Vendor billingAddressId(Long billingAddressId) {
        this.billingAddressId = billingAddressId;
        return this;
    }

    public void setBillingAddressId(Long billingAddressId) {
        this.billingAddressId = billingAddressId;
    }

    public Boolean isActive() {
        return active;
    }

    public Vendor active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getGstin() {
        return gstin;
    }

    public Vendor gstin(String gstin) {
        this.gstin = gstin;
        return this;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
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
            ", name='" + getName() + "'" +
            ", shortCode='" + getShortCode() + "'" +
            ", tinNo='" + getTinNo() + "'" +
            ", creditDays=" + getCreditDays() +
            ", createDt='" + getCreateDt() + "'" +
            ", email='" + getEmail() + "'" +
            ", addressId=" + getAddressId() +
            ", billingAddressId=" + getBillingAddressId() +
            ", active='" + isActive() + "'" +
            ", gstin='" + getGstin() + "'" +
            ", pincode='" + getPincode() + "'" +
            "}";
    }
}
