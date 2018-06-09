package com.hk.logistics.service.mapper;

import com.hk.logistics.domain.*;
import com.hk.logistics.service.dto.WarehouseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Warehouse and its DTO WarehouseDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface WarehouseMapper extends EntityMapper<WarehouseDTO, Warehouse> {


    @Mapping(target = "vendorWHCourierMappings", ignore = true)
    Warehouse toEntity(WarehouseDTO warehouseDTO);

    default Warehouse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        return warehouse;
    }
}
