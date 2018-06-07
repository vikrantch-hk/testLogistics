package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.HubDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Hub and its DTO HubDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HubMapper extends EntityMapper<HubDTO, Hub> {


    @Mapping(target = "pinCodes", ignore = true)
    Hub toEntity(HubDTO hubDTO);

    default Hub fromId(Long id) {
        if (id == null) {
            return null;
        }
        Hub hub = new Hub();
        hub.setId(id);
        return hub;
    }
}
