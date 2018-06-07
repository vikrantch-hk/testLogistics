package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.PincodeCourierMappingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PincodeCourierMapping and its DTO PincodeCourierMappingDTO.
 */
@Mapper(componentModel = "spring", uses = {PincodeMapper.class, CourierAttributesMapper.class, ProductGroupMapper.class, VendorWHCourierMappingMapper.class, SourceDestinationMappingMapper.class})
public interface PincodeCourierMappingMapper extends EntityMapper<PincodeCourierMappingDTO, PincodeCourierMapping> {

    @Mapping(source = "pincode.id", target = "pincodeId")
    @Mapping(source = "attributes.id", target = "attributesId")
    @Mapping(source = "productGroup.id", target = "productGroupId")
    @Mapping(source = "productGroup.name", target = "productGroupName")
    @Mapping(source = "vendorWHCourierMapping.id", target = "vendorWHCourierMappingId")
    @Mapping(source = "sourceDestinationMapping.id", target = "sourceDestinationMappingId")
    PincodeCourierMappingDTO toDto(PincodeCourierMapping pincodeCourierMapping);

    @Mapping(source = "pincodeId", target = "pincode")
    @Mapping(source = "attributesId", target = "attributes")
    @Mapping(source = "productGroupId", target = "productGroup")
    @Mapping(source = "vendorWHCourierMappingId", target = "vendorWHCourierMapping")
    @Mapping(source = "sourceDestinationMappingId", target = "sourceDestinationMapping")
    PincodeCourierMapping toEntity(PincodeCourierMappingDTO pincodeCourierMappingDTO);

    default PincodeCourierMapping fromId(Long id) {
        if (id == null) {
            return null;
        }
        PincodeCourierMapping pincodeCourierMapping = new PincodeCourierMapping();
        pincodeCourierMapping.setId(id);
        return pincodeCourierMapping;
    }
}
