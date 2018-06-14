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

    @NotNull
    @Column(name = "hk_shipping", nullable = false)
    private Boolean hkShipping;

    @NotNull
    @Column(name = "vendor_shipping", nullable = false)
    private Boolean vendorShipping;

    @NotNull
    @Column(name = "reverse_pickup", nullable = false)
    private Boolean reversePickup;

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

    public Boolean getPrepaidAir() {
		return prepaidAir;
	}

	public void setPrepaidAir(Boolean prepaidAir) {
		this.prepaidAir = prepaidAir;
	}

	public Boolean getPrepaidGround() {
		return prepaidGround;
	}

	public void setPrepaidGround(Boolean prepaidGround) {
		this.prepaidGround = prepaidGround;
	}

	public Boolean getCodAir() {
		return codAir;
	}

	public void setCodAir(Boolean codAir) {
		this.codAir = codAir;
	}

	public Boolean getCodGround() {
		return codGround;
	}

	public void setCodGround(Boolean codGround) {
		this.codGround = codGround;
	}

	public Boolean getReverseAir() {
		return reverseAir;
	}

	public void setReverseAir(Boolean reverseAir) {
		this.reverseAir = reverseAir;
	}

	public Boolean getReverseGround() {
		return reverseGround;
	}

	public void setReverseGround(Boolean reverseGround) {
		this.reverseGround = reverseGround;
	}

	public Boolean getCardOnDeliveryAir() {
		return cardOnDeliveryAir;
	}

	public void setCardOnDeliveryAir(Boolean cardOnDeliveryAir) {
		this.cardOnDeliveryAir = cardOnDeliveryAir;
	}

	public Boolean getCardOnDeliveryGround() {
		return cardOnDeliveryGround;
	}

	public void setCardOnDeliveryGround(Boolean cardOnDeliveryGround) {
		this.cardOnDeliveryGround = cardOnDeliveryGround;
	}

	public Boolean getHkShipping() {
		return hkShipping;
	}

	public void setHkShipping(Boolean hkShipping) {
		this.hkShipping = hkShipping;
	}

	public Boolean getVendorShipping() {
		return vendorShipping;
	}

	public void setVendorShipping(Boolean vendorShipping) {
		this.vendorShipping = vendorShipping;
	}

	public Boolean getReversePickup() {
		return reversePickup;
	}

	public void setReversePickup(Boolean reversePickup) {
		this.reversePickup = reversePickup;
	}

	public Boolean getApplicableForCheapestCourier() {
		return applicableForCheapestCourier;
	}

	public Boolean getPickupAvailable() {
		return pickupAvailable;
	}

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
