package com.hk.test.domain;

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
    @Column(name = "tin", nullable = false)
    private String tin;

    @NotNull
    @Column(name = "identifier", nullable = false)
    private String identifier;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "line_1")
    private String line1;

    @Column(name = "line_2")
    private String line2;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Column(name = "pincode", nullable = false)
    private String pincode;

    @Column(name = "wh_phone")
    private String whPhone;

    @NotNull
    @Column(name = "warehouse_type", nullable = false)
    private Long warehouseType;

    @NotNull
    @Column(name = "honoring_b_2_c_orders", nullable = false)
    private Boolean honoringB2COrders;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @NotNull
    @Column(name = "prefix_invoice_generation", nullable = false)
    private String prefixInvoiceGeneration;

    @Column(name = "fulfilment_center_code")
    private String fulfilmentCenterCode;

    @Column(name = "store_delivery")
    private Boolean storeDelivery;

    @Column(name = "gstin")
    private String gstin;

    @OneToMany(mappedBy = "warehouse")
    private Set<VendorWHCourierMapping> vendorWHCourierMappings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTin() {
        return tin;
    }

    public Warehouse tin(String tin) {
        this.tin = tin;
        return this;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    public String getIdentifier() {
        return identifier;
    }

    public Warehouse identifier(String identifier) {
        this.identifier = identifier;
        return this;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
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

    public String getLine1() {
        return line1;
    }

    public Warehouse line1(String line1) {
        this.line1 = line1;
        return this;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public Warehouse line2(String line2) {
        this.line2 = line2;
        return this;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public Warehouse city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
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

    public String getWhPhone() {
        return whPhone;
    }

    public Warehouse whPhone(String whPhone) {
        this.whPhone = whPhone;
        return this;
    }

    public void setWhPhone(String whPhone) {
        this.whPhone = whPhone;
    }

    public Long getWarehouseType() {
        return warehouseType;
    }

    public Warehouse warehouseType(Long warehouseType) {
        this.warehouseType = warehouseType;
        return this;
    }

    public void setWarehouseType(Long warehouseType) {
        this.warehouseType = warehouseType;
    }

    public Boolean isHonoringB2COrders() {
        return honoringB2COrders;
    }

    public Warehouse honoringB2COrders(Boolean honoringB2COrders) {
        this.honoringB2COrders = honoringB2COrders;
        return this;
    }

    public void setHonoringB2COrders(Boolean honoringB2COrders) {
        this.honoringB2COrders = honoringB2COrders;
    }

    public Boolean isActive() {
        return active;
    }

    public Warehouse active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getPrefixInvoiceGeneration() {
        return prefixInvoiceGeneration;
    }

    public Warehouse prefixInvoiceGeneration(String prefixInvoiceGeneration) {
        this.prefixInvoiceGeneration = prefixInvoiceGeneration;
        return this;
    }

    public void setPrefixInvoiceGeneration(String prefixInvoiceGeneration) {
        this.prefixInvoiceGeneration = prefixInvoiceGeneration;
    }

    public String getFulfilmentCenterCode() {
        return fulfilmentCenterCode;
    }

    public Warehouse fulfilmentCenterCode(String fulfilmentCenterCode) {
        this.fulfilmentCenterCode = fulfilmentCenterCode;
        return this;
    }

    public void setFulfilmentCenterCode(String fulfilmentCenterCode) {
        this.fulfilmentCenterCode = fulfilmentCenterCode;
    }

    public Boolean isStoreDelivery() {
        return storeDelivery;
    }

    public Warehouse storeDelivery(Boolean storeDelivery) {
        this.storeDelivery = storeDelivery;
        return this;
    }

    public void setStoreDelivery(Boolean storeDelivery) {
        this.storeDelivery = storeDelivery;
    }

    public String getGstin() {
        return gstin;
    }

    public Warehouse gstin(String gstin) {
        this.gstin = gstin;
        return this;
    }

    public void setGstin(String gstin) {
        this.gstin = gstin;
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
            ", tin='" + getTin() + "'" +
            ", identifier='" + getIdentifier() + "'" +
            ", name='" + getName() + "'" +
            ", line1='" + getLine1() + "'" +
            ", line2='" + getLine2() + "'" +
            ", city='" + getCity() + "'" +
            ", pincode='" + getPincode() + "'" +
            ", whPhone='" + getWhPhone() + "'" +
            ", warehouseType=" + getWarehouseType() +
            ", honoringB2COrders='" + isHonoringB2COrders() + "'" +
            ", active='" + isActive() + "'" +
            ", prefixInvoiceGeneration='" + getPrefixInvoiceGeneration() + "'" +
            ", fulfilmentCenterCode='" + getFulfilmentCenterCode() + "'" +
            ", storeDelivery='" + isStoreDelivery() + "'" +
            ", gstin='" + getGstin() + "'" +
            "}";
    }
}
