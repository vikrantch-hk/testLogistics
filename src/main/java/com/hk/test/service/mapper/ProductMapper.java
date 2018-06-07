package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductGroupMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "productGroup.id", target = "productGroupId")
    ProductDTO toDto(Product product);

    @Mapping(source = "productGroupId", target = "productGroup")
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
