package com.hk.test.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CityCourierTAT.
 */
@Entity
@Table(name = "city_courier_tat")
public class CityCourierTAT implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "turnaround_time")
    private Long turnaroundTime;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTurnaroundTime() {
        return turnaroundTime;
    }

    public CityCourierTAT turnaroundTime(Long turnaroundTime) {
        this.turnaroundTime = turnaroundTime;
        return this;
    }

    public void setTurnaroundTime(Long turnaroundTime) {
        this.turnaroundTime = turnaroundTime;
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
        CityCourierTAT cityCourierTAT = (CityCourierTAT) o;
        if (cityCourierTAT.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cityCourierTAT.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CityCourierTAT{" +
            "id=" + getId() +
            ", turnaroundTime=" + getTurnaroundTime() +
            "}";
    }
}
