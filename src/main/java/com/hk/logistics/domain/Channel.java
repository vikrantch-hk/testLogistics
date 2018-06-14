package com.hk.logistics.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Channel.
 */
@Entity
@Table(name = "channel")
public class Channel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "channel")
    private Set<CourierChannel> courierChannels = new HashSet<>();

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

    public Channel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CourierChannel> getCourierChannels() {
        return courierChannels;
    }

    public Channel courierChannels(Set<CourierChannel> courierChannels) {
        this.courierChannels = courierChannels;
        return this;
    }

    public Channel addCourierChannel(CourierChannel courierChannel) {
        this.courierChannels.add(courierChannel);
        courierChannel.setChannel(this);
        return this;
    }

    public Channel removeCourierChannel(CourierChannel courierChannel) {
        this.courierChannels.remove(courierChannel);
        courierChannel.setChannel(null);
        return this;
    }

    public void setCourierChannels(Set<CourierChannel> courierChannels) {
        this.courierChannels = courierChannels;
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
        Channel channel = (Channel) o;
        if (channel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), channel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Channel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
