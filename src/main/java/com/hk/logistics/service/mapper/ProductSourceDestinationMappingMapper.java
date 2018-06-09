package com.hk.logistics.service.mapper;

import com.hk.logistics.domain.*;
import com.hk.logistics.service.dto.ProductSourceDestinationMappingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductSourceDestinationMapping and its DTO ProductSourceDestinationMappingDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductSourceDestinationMappingMapper extends EntityMapper<ProductSourceDestinationMappingDTO, ProductSourceDestinationMapping> {



    default ProductSourceDestinationMapping fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductSourceDestinationMapping productSourceDestinationMapping = new ProductSourceDestinationMapping();
        productSourceDestinationMapping.setId(id);
        return productSourceDestinationMapping;
    }
}
