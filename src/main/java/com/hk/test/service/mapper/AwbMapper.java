package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.AwbDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Awb and its DTO AwbDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AwbMapper extends EntityMapper<AwbDTO, Awb> {



    default Awb fromId(Long id) {
        if (id == null) {
            return null;
        }
        Awb awb = new Awb();
        awb.setId(id);
        return awb;
    }
}
