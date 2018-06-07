package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.PincodeRegionZoneDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PincodeRegionZone and its DTO PincodeRegionZoneDTO.
 */
@Mapper(componentModel = "spring", uses = {RegionTypeMapper.class, CourierGroupMapper.class, VendorWHCourierMappingMapper.class})
public interface PincodeRegionZoneMapper extends EntityMapper<PincodeRegionZoneDTO, PincodeRegionZone> {

    @Mapping(source = "regionType.id", target = "regionTypeId")
    @Mapping(source = "regionType.name", target = "regionTypeName")
    @Mapping(source = "courierGroup.id", target = "courierGroupId")
    @Mapping(source = "courierGroup.name", target = "courierGroupName")
    @Mapping(source = "vendorWHCourierMapping.id", target = "vendorWHCourierMappingId")
    PincodeRegionZoneDTO toDto(PincodeRegionZone pincodeRegionZone);

    @Mapping(source = "regionTypeId", target = "regionType")
    @Mapping(source = "courierGroupId", target = "courierGroup")
    @Mapping(source = "vendorWHCourierMappingId", target = "vendorWHCourierMapping")
    PincodeRegionZone toEntity(PincodeRegionZoneDTO pincodeRegionZoneDTO);

    default PincodeRegionZone fromId(Long id) {
        if (id == null) {
            return null;
        }
        PincodeRegionZone pincodeRegionZone = new PincodeRegionZone();
        pincodeRegionZone.setId(id);
        return pincodeRegionZone;
    }
}
