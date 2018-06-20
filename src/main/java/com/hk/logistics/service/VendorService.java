package com.hk.logistics.service;

import com.hk.logistics.service.dto.VendorDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Vendor.
 */
public interface VendorService {

    /**
     * Save a vendor.
     *
     * @param vendorDTO the entity to save
     * @return the persisted entity
     */
    VendorDTO save(VendorDTO vendorDTO);

    /**
     * Get all the vendors.
     *
     * @return the list of entities
     */
    List<VendorDTO> findAll();


    /**
     * Get the "id" vendor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<VendorDTO> findOne(Long id);

    /**
     * Delete the "id" vendor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the vendor corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<VendorDTO> search(String query);
}
