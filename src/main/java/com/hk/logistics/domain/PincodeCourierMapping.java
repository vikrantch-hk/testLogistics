package com.hk.logistics.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A PincodeCourierMapping.
 */
@Entity
@Table(name = "pincode_courier_mapping")
public class PincodeCourierMapping implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "routing_code")
    private String routingCode;

    @NotNull
    @Column(name = "applicable_for_cheapest_courier", nullable = false)
    private Boolean applicableForCheapestCourier;

    @Column(name = "estimated_delivery_days")
    private Double estimatedDeliveryDays;

    @NotNull
    @Column(name = "pickup_available", nullable = false)
    private Boolean pickupAvailable;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Pincode pincode;//TODO :To be removed

    @ManyToOne
    @JsonIgnoreProperties("")
    private CourierAttributes attributes;

    @ManyToOne
    @JsonIgnoreProperties("")
    private VendorWHCourierMapping vendorWHCourierMapping;

    @ManyToOne
    @JsonIgnoreProperties("")
    private SourceDestinationMapping sourceDestinationMapping;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoutingCode() {
        return routingCode;
    }

    public PincodeCourierMapping routingCode(String routingCode) {
        this.routingCode = routingCode;
        return this;
    }

    public void setRoutingCode(String routingCode) {
        this.routingCode = routingCode;
    }

    public Boolean isApplicableForCheapestCourier() {
        return applicableForCheapestCourier;
    }

    public PincodeCourierMapping applicableForCheapestCourier(Boolean applicableForCheapestCourier) {
        this.applicableForCheapestCourier = applicableForCheapestCourier;
        return this;
    }

    public void setApplicableForCheapestCourier(Boolean applicableForCheapestCourier) {
        this.applicableForCheapestCourier = applicableForCheapestCourier;
    }

    public Double getEstimatedDeliveryDays() {
        return estimatedDeliveryDays;
    }

    public PincodeCourierMapping estimatedDeliveryDays(Double estimatedDeliveryDays) {
        this.estimatedDeliveryDays = estimatedDeliveryDays;
        return this;
    }

    public void setEstimatedDeliveryDays(Double estimatedDeliveryDays) {
        this.estimatedDeliveryDays = estimatedDeliveryDays;
    }

    public Boolean isPickupAvailable() {
        return pickupAvailable;
    }

    public PincodeCourierMapping pickupAvailable(Boolean pickupAvailable) {
        this.pickupAvailable = pickupAvailable;
        return this;
    }

    public void setPickupAvailable(Boolean pickupAvailable) {
        this.pickupAvailable = pickupAvailable;
    }

    public Pincode getPincode() {
        return pincode;
    }

    public PincodeCourierMapping pincode(Pincode pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(Pincode pincode) {
        this.pincode = pincode;
    }

    public CourierAttributes getAttributes() {
        return attributes;
    }

    public PincodeCourierMapping attributes(CourierAttributes courierAttributes) {
        this.attributes = courierAttributes;
        return this;
    }

    public void setAttributes(CourierAttributes courierAttributes) {
        this.attributes = courierAttributes;
    }

    public VendorWHCourierMapping getVendorWHCourierMapping() {
        return vendorWHCourierMapping;
    }

    public PincodeCourierMapping vendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMapping = vendorWHCourierMapping;
        return this;
    }

    public void setVendorWHCourierMapping(VendorWHCourierMapping vendorWHCourierMapping) {
        this.vendorWHCourierMapping = vendorWHCourierMapping;
    }

    public SourceDestinationMapping getSourceDestinationMapping() {
        return sourceDestinationMapping;
    }

    public PincodeCourierMapping sourceDestinationMapping(SourceDestinationMapping sourceDestinationMapping) {
        this.sourceDestinationMapping = sourceDestinationMapping;
        return this;
    }

    public void setSourceDestinationMapping(SourceDestinationMapping sourceDestinationMapping) {
        this.sourceDestinationMapping = sourceDestinationMapping;
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
        PincodeCourierMapping pincodeCourierMapping = (PincodeCourierMapping) o;
        if (pincodeCourierMapping.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pincodeCourierMapping.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PincodeCourierMapping{" +
            "id=" + getId() +
            ", routingCode='" + getRoutingCode() + "'" +
            ", applicableForCheapestCourier='" + isApplicableForCheapestCourier() + "'" +
            ", estimatedDeliveryDays=" + getEstimatedDeliveryDays() +
            ", pickupAvailable='" + isPickupAvailable() + "'" +
            "}";
    }
}
