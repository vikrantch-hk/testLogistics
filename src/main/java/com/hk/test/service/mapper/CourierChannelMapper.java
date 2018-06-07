package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.CourierChannelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CourierChannel and its DTO CourierChannelDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CourierChannelMapper extends EntityMapper<CourierChannelDTO, CourierChannel> {


    @Mapping(target = "vendorWHCourierMappings", ignore = true)
    @Mapping(target = "couriers", ignore = true)
    CourierChannel toEntity(CourierChannelDTO courierChannelDTO);

    default CourierChannel fromId(Long id) {
        if (id == null) {
            return null;
        }
        CourierChannel courierChannel = new CourierChannel();
        courierChannel.setId(id);
        return courierChannel;
    }
}
