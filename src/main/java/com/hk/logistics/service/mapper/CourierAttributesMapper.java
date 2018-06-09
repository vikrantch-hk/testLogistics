package com.hk.logistics.service.mapper;

import com.hk.logistics.domain.*;
import com.hk.logistics.service.dto.CourierAttributesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CourierAttributes and its DTO CourierAttributesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CourierAttributesMapper extends EntityMapper<CourierAttributesDTO, CourierAttributes> {



    default CourierAttributes fromId(Long id) {
        if (id == null) {
            return null;
        }
        CourierAttributes courierAttributes = new CourierAttributes();
        courierAttributes.setId(id);
        return courierAttributes;
    }
}
