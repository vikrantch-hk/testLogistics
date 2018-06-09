package com.hk.logistics.service.mapper;

import com.hk.logistics.domain.*;
import com.hk.logistics.service.dto.SourceDestinationMappingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SourceDestinationMapping and its DTO SourceDestinationMappingDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface SourceDestinationMappingMapper extends EntityMapper<SourceDestinationMappingDTO, SourceDestinationMapping> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.name", target = "productName")
    SourceDestinationMappingDTO toDto(SourceDestinationMapping sourceDestinationMapping);

    @Mapping(source = "productId", target = "product")
    SourceDestinationMapping toEntity(SourceDestinationMappingDTO sourceDestinationMappingDTO);

    default SourceDestinationMapping fromId(Long id) {
        if (id == null) {
            return null;
        }
        SourceDestinationMapping sourceDestinationMapping = new SourceDestinationMapping();
        sourceDestinationMapping.setId(id);
        return sourceDestinationMapping;
    }
}
