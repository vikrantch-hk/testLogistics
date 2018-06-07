package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.ZoneDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Zone and its DTO ZoneDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ZoneMapper extends EntityMapper<ZoneDTO, Zone> {



    default Zone fromId(Long id) {
        if (id == null) {
            return null;
        }
        Zone zone = new Zone();
        zone.setId(id);
        return zone;
    }
}
