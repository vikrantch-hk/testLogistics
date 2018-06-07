package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.SourceDestinationMappingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SourceDestinationMapping and its DTO SourceDestinationMappingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SourceDestinationMappingMapper extends EntityMapper<SourceDestinationMappingDTO, SourceDestinationMapping> {



    default SourceDestinationMapping fromId(Long id) {
        if (id == null) {
            return null;
        }
        SourceDestinationMapping sourceDestinationMapping = new SourceDestinationMapping();
        sourceDestinationMapping.setId(id);
        return sourceDestinationMapping;
    }
}
