package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.CourierAttributesDTO;

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
