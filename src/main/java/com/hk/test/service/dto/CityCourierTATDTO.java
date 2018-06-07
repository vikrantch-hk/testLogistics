package com.hk.test.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CityCourierTAT entity.
 */
public class CityCourierTATDTO implements Serializable {

    private Long id;

    private Long turnaroundTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTurnaroundTime() {
        return turnaroundTime;
    }

    public void setTurnaroundTime(Long turnaroundTime) {
        this.turnaroundTime = turnaroundTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CityCourierTATDTO cityCourierTATDTO = (CityCourierTATDTO) o;
        if (cityCourierTATDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cityCourierTATDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CityCourierTATDTO{" +
            "id=" + getId() +
            ", turnaroundTime=" + getTurnaroundTime() +
            "}";
    }
}
