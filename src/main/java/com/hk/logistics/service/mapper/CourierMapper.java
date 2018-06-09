package com.hk.logistics.service.mapper;

import com.hk.logistics.domain.*;
import com.hk.logistics.service.dto.CourierDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Courier and its DTO CourierDTO.
 */
@Mapper(componentModel = "spring", uses = {CourierChannelMapper.class, CourierGroupMapper.class})
public interface CourierMapper extends EntityMapper<CourierDTO, Courier> {



    default Courier fromId(Long id) {
        if (id == null) {
            return null;
        }
        Courier courier = new Courier();
        courier.setId(id);
        return courier;
    }
}
