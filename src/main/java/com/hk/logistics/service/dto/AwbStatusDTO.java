package com.hk.logistics.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AwbStatus entity.
 */
public class AwbStatusDTO implements Serializable {

    private Long id;

    private String awbStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAwbStatus() {
        return awbStatus;
    }

    public void setAwbStatus(String awbStatus) {
        this.awbStatus = awbStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AwbStatusDTO awbStatusDTO = (AwbStatusDTO) o;
        if (awbStatusDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), awbStatusDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AwbStatusDTO{" +
            "id=" + getId() +
            ", awbStatus='" + getAwbStatus() + "'" +
            "}";
    }
}
