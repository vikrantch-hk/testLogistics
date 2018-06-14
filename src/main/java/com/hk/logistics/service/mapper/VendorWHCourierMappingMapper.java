package com.hk.logistics.service.mapper;

import com.hk.logistics.domain.*;
import com.hk.logistics.service.dto.VendorWHCourierMappingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity VendorWHCourierMapping and its DTO VendorWHCourierMappingDTO.
 */
@Mapper(componentModel = "spring", uses = {VendorMapper.class, WarehouseMapper.class, CourierChannelMapper.class})
public interface VendorWHCourierMappingMapper extends EntityMapper<VendorWHCourierMappingDTO, VendorWHCourierMapping> {

    @Mapping(source = "vendor.id", target = "vendorId")
    @Mapping(source = "vendor.name", target = "vendorName")
    @Mapping(source = "warehouse.id", target = "warehouseId")
    @Mapping(source = "warehouse.name", target = "warehouseName")
    @Mapping(source = "courierChannel.id", target = "courierChannelId")
    @Mapping(source = "courierChannel.name", target = "courierChannelName")
    VendorWHCourierMappingDTO toDto(VendorWHCourierMapping vendorWHCourierMapping);

    @Mapping(source = "vendorId", target = "vendor")
    @Mapping(source = "warehouseId", target = "warehouse")
    @Mapping(source = "courierChannelId", target = "courierChannel")
    VendorWHCourierMapping toEntity(VendorWHCourierMappingDTO vendorWHCourierMappingDTO);

    default VendorWHCourierMapping fromId(Long id) {
        if (id == null) {
            return null;
        }
        VendorWHCourierMapping vendorWHCourierMapping = new VendorWHCourierMapping();
        vendorWHCourierMapping.setId(id);
        return vendorWHCourierMapping;
    }
}
