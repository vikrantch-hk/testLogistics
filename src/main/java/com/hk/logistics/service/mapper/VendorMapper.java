package com.hk.logistics.service.mapper;

import com.hk.logistics.domain.*;
import com.hk.logistics.service.dto.VendorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vendor and its DTO VendorDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VendorMapper extends EntityMapper<VendorDTO, Vendor> {


    @Mapping(target = "vendorWHCourierMappings", ignore = true)
    Vendor toEntity(VendorDTO vendorDTO);

    default Vendor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vendor vendor = new Vendor();
        vendor.setId(id);
        return vendor;
    }
}
