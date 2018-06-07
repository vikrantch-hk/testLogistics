package com.hk.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ProductGroup.
 */
@Entity
@Table(name = "product_group")
public class ProductGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "productGroup")
    private Set<Product> products = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ProductGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public ProductGroup products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public ProductGroup addProduct(Product product) {
        this.products.add(product);
        product.setProductGroup(this);
        return this;
    }

    public ProductGroup removeProduct(Product product) {
        this.products.remove(product);
        product.setProductGroup(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
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
        ProductGroup productGroup = (ProductGroup) o;
        if (productGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
