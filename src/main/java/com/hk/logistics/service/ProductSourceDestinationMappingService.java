package com.hk.logistics.service;

import com.hk.logistics.service.dto.ProductSourceDestinationMappingDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ProductSourceDestinationMapping.
 */
public interface ProductSourceDestinationMappingService {

    /**
     * Save a productSourceDestinationMapping.
     *
     * @param productSourceDestinationMappingDTO the entity to save
     * @return the persisted entity
     */
    ProductSourceDestinationMappingDTO save(ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO);

    /**
     * Get all the productSourceDestinationMappings.
     *
     * @return the list of entities
     */
    List<ProductSourceDestinationMappingDTO> findAll();


    /**
     * Get the "id" productSourceDestinationMapping.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ProductSourceDestinationMappingDTO> findOne(Long id);

    /**
     * Delete the "id" productSourceDestinationMapping.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the productSourceDestinationMapping corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<ProductSourceDestinationMappingDTO> search(String query);
}
