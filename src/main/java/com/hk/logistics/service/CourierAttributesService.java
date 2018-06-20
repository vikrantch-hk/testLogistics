package com.hk.logistics.service;

import com.hk.logistics.service.dto.CourierAttributesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CourierAttributes.
 */
public interface CourierAttributesService {

    /**
     * Save a courierAttributes.
     *
     * @param courierAttributesDTO the entity to save
     * @return the persisted entity
     */
    CourierAttributesDTO save(CourierAttributesDTO courierAttributesDTO);

    /**
     * Get all the courierAttributes.
     *
     * @return the list of entities
     */
    List<CourierAttributesDTO> findAll();


    /**
     * Get the "id" courierAttributes.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CourierAttributesDTO> findOne(Long id);

    /**
     * Delete the "id" courierAttributes.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the courierAttributes corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CourierAttributesDTO> search(String query);
}
