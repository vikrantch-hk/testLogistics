package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.CityCourierTATDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CityCourierTAT and its DTO CityCourierTATDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CityCourierTATMapper extends EntityMapper<CityCourierTATDTO, CityCourierTAT> {



    default CityCourierTAT fromId(Long id) {
        if (id == null) {
            return null;
        }
        CityCourierTAT cityCourierTAT = new CityCourierTAT();
        cityCourierTAT.setId(id);
        return cityCourierTAT;
    }
}
