package com.hk.logistics.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CourierAttributes entity.
 */
public class CourierAttributesDTO implements Serializable {

    private Long id;

    @NotNull
    private Boolean prepaidAir;

    @NotNull
    private Boolean prepaidGround;

    @NotNull
    private Boolean codAir;

    @NotNull
    private Boolean codGround;

    @NotNull
    private Boolean reverseAir;

    @NotNull
    private Boolean reverseGround;

    @NotNull
    private Boolean cardOnDeliveryAir;

    @NotNull
    private Boolean cardOnDeliveryGround;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPrepaidAir() {
        return prepaidAir;
    }

    public void setPrepaidAir(Boolean prepaidAir) {
        this.prepaidAir = prepaidAir;
    }

    public Boolean isPrepaidGround() {
        return prepaidGround;
    }

    public void setPrepaidGround(Boolean prepaidGround) {
        this.prepaidGround = prepaidGround;
    }

    public Boolean isCodAir() {
        return codAir;
    }

    public void setCodAir(Boolean codAir) {
        this.codAir = codAir;
    }

    public Boolean isCodGround() {
        return codGround;
    }

    public void setCodGround(Boolean codGround) {
        this.codGround = codGround;
    }

    public Boolean isReverseAir() {
        return reverseAir;
    }

    public void setReverseAir(Boolean reverseAir) {
        this.reverseAir = reverseAir;
    }

    public Boolean isReverseGround() {
        return reverseGround;
    }

    public void setReverseGround(Boolean reverseGround) {
        this.reverseGround = reverseGround;
    }

    public Boolean isCardOnDeliveryAir() {
        return cardOnDeliveryAir;
    }

    public void setCardOnDeliveryAir(Boolean cardOnDeliveryAir) {
        this.cardOnDeliveryAir = cardOnDeliveryAir;
    }

    public Boolean isCardOnDeliveryGround() {
        return cardOnDeliveryGround;
    }

    public void setCardOnDeliveryGround(Boolean cardOnDeliveryGround) {
        this.cardOnDeliveryGround = cardOnDeliveryGround;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CourierAttributesDTO courierAttributesDTO = (CourierAttributesDTO) o;
        if (courierAttributesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courierAttributesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourierAttributesDTO{" +
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
