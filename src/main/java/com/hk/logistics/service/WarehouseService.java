package com.hk.logistics.service;

import com.hk.logistics.service.dto.WarehouseDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Warehouse.
 */
public interface WarehouseService {

    /**
     * Save a warehouse.
     *
     * @param warehouseDTO the entity to save
     * @return the persisted entity
     */
    WarehouseDTO save(WarehouseDTO warehouseDTO);

    /**
     * Get all the warehouses.
     *
     * @return the list of entities
     */
    List<WarehouseDTO> findAll();


    /**
     * Get the "id" warehouse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<WarehouseDTO> findOne(Long id);

    /**
     * Delete the "id" warehouse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the warehouse corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<WarehouseDTO> search(String query);
}
