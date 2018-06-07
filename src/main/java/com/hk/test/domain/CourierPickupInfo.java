package com.hk.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A CourierPickupInfo.
 */
@Entity
@Table(name = "courier_pickup_info")
public class CourierPickupInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pickup_confirmation_no")
    private String pickupConfirmationNo;

    @Column(name = "tracking_no")
    private String trackingNo;

    @NotNull
    @Column(name = "pickup_date", nullable = false)
    private LocalDate pickupDate;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Courier courier;

    @ManyToOne
    @JsonIgnoreProperties("")
    private PickupStatus pickupStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPickupConfirmationNo() {
        return pickupConfirmationNo;
    }

    public CourierPickupInfo pickupConfirmationNo(String pickupConfirmationNo) {
        this.pickupConfirmationNo = pickupConfirmationNo;
        return this;
    }

    public void setPickupConfirmationNo(String pickupConfirmationNo) {
        this.pickupConfirmationNo = pickupConfirmationNo;
    }

    public String getTrackingNo() {
        return trackingNo;
    }

    public CourierPickupInfo trackingNo(String trackingNo) {
        this.trackingNo = trackingNo;
        return this;
    }

    public void setTrackingNo(String trackingNo) {
        this.trackingNo = trackingNo;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public CourierPickupInfo pickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
        return this;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public Courier getCourier() {
        return courier;
    }

    public CourierPickupInfo courier(Courier courier) {
        this.courier = courier;
        return this;
    }

    public void setCourier(Courier courier) {
        this.courier = courier;
    }

    public PickupStatus getPickupStatus() {
        return pickupStatus;
    }

    public CourierPickupInfo pickupStatus(PickupStatus pickupStatus) {
        this.pickupStatus = pickupStatus;
        return this;
    }

    public void setPickupStatus(PickupStatus pickupStatus) {
        this.pickupStatus = pickupStatus;
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
        CourierPickupInfo courierPickupInfo = (CourierPickupInfo) o;
        if (courierPickupInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courierPickupInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourierPickupInfo{" +
            "id=" + getId() +
            ", pickupConfirmationNo='" + getPickupConfirmationNo() + "'" +
            ", trackingNo='" + getTrackingNo() + "'" +
            ", pickupDate='" + getPickupDate() + "'" +
            "}";
    }
}
