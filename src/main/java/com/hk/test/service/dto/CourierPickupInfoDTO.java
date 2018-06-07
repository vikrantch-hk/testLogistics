package com.hk.test.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CourierPickupInfo entity.
 */
public class CourierPickupInfoDTO implements Serializable {

    private Long id;

    private String pickupConfirmationNo;

    private String trackingNo;

    @NotNull
    private LocalDate pickupDate;

    private Long courierId;

    private String courierName;

    private Long pickupStatusId;

    private String pickupStatusName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPickupConfirmationNo() {
        return pickupConfirmationNo;
    }

    public void setPickupConfirmationNo(String pickupConfirmationNo) {
        this.pickupConfirmationNo = pickupConfirmationNo;
    }

    public String getTrackingNo() {
        return trackingNo;
    }

    public void setTrackingNo(String trackingNo) {
        this.trackingNo = trackingNo;
    }

    public LocalDate getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(LocalDate pickupDate) {
        this.pickupDate = pickupDate;
    }

    public Long getCourierId() {
        return courierId;
    }

    public void setCourierId(Long courierId) {
        this.courierId = courierId;
    }

    public String getCourierName() {
        return courierName;
    }

    public void setCourierName(String courierName) {
        this.courierName = courierName;
    }

    public Long getPickupStatusId() {
        return pickupStatusId;
    }

    public void setPickupStatusId(Long pickupStatusId) {
        this.pickupStatusId = pickupStatusId;
    }

    public String getPickupStatusName() {
        return pickupStatusName;
    }

    public void setPickupStatusName(String pickupStatusName) {
        this.pickupStatusName = pickupStatusName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CourierPickupInfoDTO courierPickupInfoDTO = (CourierPickupInfoDTO) o;
        if (courierPickupInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), courierPickupInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CourierPickupInfoDTO{" +
            "id=" + getId() +
            ", pickupConfirmationNo='" + getPickupConfirmationNo() + "'" +
            ", trackingNo='" + getTrackingNo() + "'" +
            ", pickupDate='" + getPickupDate() + "'" +
            ", courier=" + getCourierId() +
            ", courier='" + getCourierName() + "'" +
            ", pickupStatus=" + getPickupStatusId() +
            ", pickupStatus='" + getPickupStatusName() + "'" +
            "}";
    }
}
