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
    @Column(name = "prepaid_air", nullable = false)
    private Boolean prepaidAir;

    @NotNull
    @Column(name = "prepaid_ground", nullable = false)
    private Boolean prepaidGround;

    @NotNull
    @Column(name = "cod_air", nullable = false)
    private Boolean codAir;

    @NotNull
    @Column(name = "cod_ground", nullable = false)
    private Boolean codGround;

    @NotNull
    @Column(name = "reverse_air", nullable = false)
    private Boolean reverseAir;

    @NotNull
    @Column(name = "reverse_ground", nullable = false)
    private Boolean reverseGround;

    @NotNull
    @Column(name = "card_on_delivery_air", nullable = false)
    private Boolean cardOnDeliveryAir;

    @NotNull
    @Column(name = "card_on_delivery_ground", nullable = false)
    private Boolean cardOnDeliveryGround;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPrepaidAir() {
        return prepaidAir;
    }

    public CourierAttributes prepaidAir(Boolean prepaidAir) {
        this.prepaidAir = prepaidAir;
        return this;
    }

    public void setPrepaidAir(Boolean prepaidAir) {
        this.prepaidAir = prepaidAir;
    }

    public Boolean isPrepaidGround() {
        return prepaidGround;
    }

    public CourierAttributes prepaidGround(Boolean prepaidGround) {
        this.prepaidGround = prepaidGround;
        return this;
    }

    public void setPrepaidGround(Boolean prepaidGround) {
        this.prepaidGround = prepaidGround;
    }

    public Boolean isCodAir() {
        return codAir;
    }

    public CourierAttributes codAir(Boolean codAir) {
        this.codAir = codAir;
        return this;
    }

    public void setCodAir(Boolean codAir) {
        this.codAir = codAir;
    }

    public Boolean isCodGround() {
        return codGround;
    }

    public CourierAttributes codGround(Boolean codGround) {
        this.codGround = codGround;
        return this;
    }

    public void setCodGround(Boolean codGround) {
        this.codGround = codGround;
    }

    public Boolean isReverseAir() {
        return reverseAir;
    }

    public CourierAttributes reverseAir(Boolean reverseAir) {
        this.reverseAir = reverseAir;
        return this;
    }

    public void setReverseAir(Boolean reverseAir) {
        this.reverseAir = reverseAir;
    }

    public Boolean isReverseGround() {
        return reverseGround;
    }

    public CourierAttributes reverseGround(Boolean reverseGround) {
        this.reverseGround = reverseGround;
        return this;
    }

    public void setReverseGround(Boolean reverseGround) {
        this.reverseGround = reverseGround;
    }

    public Boolean isCardOnDeliveryAir() {
        return cardOnDeliveryAir;
    }

    public CourierAttributes cardOnDeliveryAir(Boolean cardOnDeliveryAir) {
        this.cardOnDeliveryAir = cardOnDeliveryAir;
        return this;
    }

    public void setCardOnDeliveryAir(Boolean cardOnDeliveryAir) {
        this.cardOnDeliveryAir = cardOnDeliveryAir;
    }

    public Boolean isCardOnDeliveryGround() {
        return cardOnDeliveryGround;
    }

    public CourierAttributes cardOnDeliveryGround(Boolean cardOnDeliveryGround) {
        this.cardOnDeliveryGround = cardOnDeliveryGround;
        return this;
    }

    public void setCardOnDeliveryGround(Boolean cardOnDeliveryGround) {
        this.cardOnDeliveryGround = cardOnDeliveryGround;
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
            ", prepaidAir='" + isPrepaidAir() + "'" +
            ", prepaidGround='" + isPrepaidGround() + "'" +
            ", codAir='" + isCodAir() + "'" +
            ", codGround='" + isCodGround() + "'" +
            ", reverseAir='" + isReverseAir() + "'" +
            ", reverseGround='" + isReverseGround() + "'" +
            ", cardOnDeliveryAir='" + isCardOnDeliveryAir() + "'" +
            ", cardOnDeliveryGround='" + isCardOnDeliveryGround() + "'" +
            "}";
    }
}
