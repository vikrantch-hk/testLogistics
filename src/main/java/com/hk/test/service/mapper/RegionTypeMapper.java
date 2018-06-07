package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.RegionTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity RegionType and its DTO RegionTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RegionTypeMapper extends EntityMapper<RegionTypeDTO, RegionType> {



    default RegionType fromId(Long id) {
        if (id == null) {
            return null;
        }
        RegionType regionType = new RegionType();
        regionType.setId(id);
        return regionType;
    }
}
