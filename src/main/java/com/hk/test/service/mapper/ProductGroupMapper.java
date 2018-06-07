package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.ProductGroupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductGroup and its DTO ProductGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductGroupMapper extends EntityMapper<ProductGroupDTO, ProductGroup> {


    @Mapping(target = "products", ignore = true)
    ProductGroup toEntity(ProductGroupDTO productGroupDTO);

    default ProductGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductGroup productGroup = new ProductGroup();
        productGroup.setId(id);
        return productGroup;
    }
}
