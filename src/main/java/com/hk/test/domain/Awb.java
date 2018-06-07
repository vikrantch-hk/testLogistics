package com.hk.test.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Awb.
 */
@Entity
@Table(name = "awb")
public class Awb implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "awb_number", nullable = false)
    private String awbNumber;

    @NotNull
    @Column(name = "awb_bar_code", nullable = false)
    private String awbBarCode;

    @NotNull
    @Column(name = "cod", nullable = false)
    private Boolean cod;

    @NotNull
    @Column(name = "create_date", nullable = false)
    private LocalDate createDate;

    @Column(name = "return_awb_number")
    private String returnAwbNumber;

    @Column(name = "return_awb_bar_code")
    private String returnAwbBarCode;

    @NotNull
    @Column(name = "is_bright_awb", nullable = false)
    private Boolean isBrightAwb;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAwbNumber() {
        return awbNumber;
    }

    public Awb awbNumber(String awbNumber) {
        this.awbNumber = awbNumber;
        return this;
    }

    public void setAwbNumber(String awbNumber) {
        this.awbNumber = awbNumber;
    }

    public String getAwbBarCode() {
        return awbBarCode;
    }

    public Awb awbBarCode(String awbBarCode) {
        this.awbBarCode = awbBarCode;
        return this;
    }

    public void setAwbBarCode(String awbBarCode) {
        this.awbBarCode = awbBarCode;
    }

    public Boolean isCod() {
        return cod;
    }

    public Awb cod(Boolean cod) {
        this.cod = cod;
        return this;
    }

    public void setCod(Boolean cod) {
        this.cod = cod;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public Awb createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public String getReturnAwbNumber() {
        return returnAwbNumber;
    }

    public Awb returnAwbNumber(String returnAwbNumber) {
        this.returnAwbNumber = returnAwbNumber;
        return this;
    }

    public void setReturnAwbNumber(String returnAwbNumber) {
        this.returnAwbNumber = returnAwbNumber;
    }

    public String getReturnAwbBarCode() {
        return returnAwbBarCode;
    }

    public Awb returnAwbBarCode(String returnAwbBarCode) {
        this.returnAwbBarCode = returnAwbBarCode;
        return this;
    }

    public void setReturnAwbBarCode(String returnAwbBarCode) {
        this.returnAwbBarCode = returnAwbBarCode;
    }

    public Boolean isIsBrightAwb() {
        return isBrightAwb;
    }

    public Awb isBrightAwb(Boolean isBrightAwb) {
        this.isBrightAwb = isBrightAwb;
        return this;
    }

    public void setIsBrightAwb(Boolean isBrightAwb) {
        this.isBrightAwb = isBrightAwb;
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
        Awb awb = (Awb) o;
        if (awb.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), awb.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Awb{" +
            "id=" + getId() +
            ", awbNumber='" + getAwbNumber() + "'" +
            ", awbBarCode='" + getAwbBarCode() + "'" +
            ", cod='" + isCod() + "'" +
            ", createDate='" + getCreateDate() + "'" +
            ", returnAwbNumber='" + getReturnAwbNumber() + "'" +
            ", returnAwbBarCode='" + getReturnAwbBarCode() + "'" +
            ", isBrightAwb='" + isIsBrightAwb() + "'" +
            "}";
    }
}
