package com.hk.logistics.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CourierAttributes.
 */
@Entity
@Table(name = "courier_attributes")
public class CourierAttributes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "hk_shipping", nullable = false)
    private Boolean hkShipping;

    @NotNull
    @Column(name = "vendor_shipping", nullable = false)
    private Boolean vendorShipping;

    @NotNull
    @Column(name = "reverse_pickup", nullable = false)
    private Boolean reversePickup;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isHkShipping() {
        return hkShipping;
    }

    public CourierAttributes hkShipping(Boolean hkShipping) {
        this.hkShipping = hkShipping;
        return this;
    }

    public void setHkShipping(Boolean hkShipping) {
        this.hkShipping = hkShipping;
    }

    public Boolean isVendorShipping() {
        return vendorShipping;
    }

    public CourierAttributes vendorShipping(Boolean vendorShipping) {
        this.vendorShipping = vendorShipping;
        return this;
    }

    public void setVendorShipping(Boolean vendorShipping) {
        this.vendorShipping = vendorShipping;
    }

    public Boolean isReversePickup() {
        return reversePickup;
    }

    public CourierAttributes reversePickup(Boolean reversePickup) {
        this.reversePickup = reversePickup;
        return this;
    }

    public void setReversePickup(Boolean reversePickup) {
        this.reversePickup = reversePickup;
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
        CourierAttributes courierAttributes = (CourierAttributes) o;
        if (courierAttributes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courierAttributes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourierAttributes{" +
            "id=" + getId() +
            ", hkShipping='" + isHkShipping() + "'" +
            ", vendorShipping='" + isVendorShipping() + "'" +
            ", reversePickup='" + isReversePickup() + "'" +
            "}";
    }
}
