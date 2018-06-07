package com.hk.test.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AwbStatus.
 */
@Entity
@Table(name = "awb_status")
public class AwbStatus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "awb_status")
    private String awbStatus;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAwbStatus() {
        return awbStatus;
    }

    public AwbStatus awbStatus(String awbStatus) {
        this.awbStatus = awbStatus;
        return this;
    }

    public void setAwbStatus(String awbStatus) {
        this.awbStatus = awbStatus;
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
        AwbStatus awbStatus = (AwbStatus) o;
        if (awbStatus.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), awbStatus.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AwbStatus{" +
            "id=" + getId() +
            ", awbStatus='" + getAwbStatus() + "'" +
            "}";
    }
}
