package com.hk.test.service.mapper;

import com.hk.test.domain.*;
import com.hk.test.service.dto.CourierPickupInfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CourierPickupInfo and its DTO CourierPickupInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {CourierMapper.class, PickupStatusMapper.class})
public interface CourierPickupInfoMapper extends EntityMapper<CourierPickupInfoDTO, CourierPickupInfo> {

    @Mapping(source = "courier.id", target = "courierId")
    @Mapping(source = "courier.name", target = "courierName")
    @Mapping(source = "pickupStatus.id", target = "pickupStatusId")
    @Mapping(source = "pickupStatus.name", target = "pickupStatusName")
    CourierPickupInfoDTO toDto(CourierPickupInfo courierPickupInfo);

    @Mapping(source = "courierId", target = "courier")
    @Mapping(source = "pickupStatusId", target = "pickupStatus")
    CourierPickupInfo toEntity(CourierPickupInfoDTO courierPickupInfoDTO);

    default CourierPickupInfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        CourierPickupInfo courierPickupInfo = new CourierPickupInfo();
        courierPickupInfo.setId(id);
        return courierPickupInfo;
    }
}
