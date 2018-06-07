package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.VendorDTO;

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
