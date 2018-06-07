package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.PickupStatusDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PickupStatus and its DTO PickupStatusDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PickupStatusMapper extends EntityMapper<PickupStatusDTO, PickupStatus> {



    default PickupStatus fromId(Long id) {
        if (id == null) {
            return null;
        }
        PickupStatus pickupStatus = new PickupStatus();
        pickupStatus.setId(id);
        return pickupStatus;
    }
}
