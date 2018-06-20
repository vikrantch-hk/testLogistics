package com.hk.logistics.service.impl;

import com.hk.logistics.service.VendorService;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.repository.VendorRepository;
import com.hk.logistics.repository.search.VendorSearchRepository;
import com.hk.logistics.service.dto.VendorDTO;
import com.hk.logistics.service.mapper.VendorMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Vendor.
 */
@Service
@Transactional
public class VendorServiceImpl implements VendorService {

    private final Logger log = LoggerFactory.getLogger(VendorServiceImpl.class);

    private final VendorRepository vendorRepository;

    private final VendorMapper vendorMapper;

    private final VendorSearchRepository vendorSearchRepository;

    public VendorServiceImpl(VendorRepository vendorRepository, VendorMapper vendorMapper, VendorSearchRepository vendorSearchRepository) {
        this.vendorRepository = vendorRepository;
        this.vendorMapper = vendorMapper;
        this.vendorSearchRepository = vendorSearchRepository;
    }

    /**
     * Save a vendor.
     *
     * @param vendorDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VendorDTO save(VendorDTO vendorDTO) {
        log.debug("Request to save Vendor : {}", vendorDTO);
        Vendor vendor = vendorMapper.toEntity(vendorDTO);
        vendor = vendorRepository.save(vendor);
        VendorDTO result = vendorMapper.toDto(vendor);
        vendorSearchRepository.save(vendor);
        return result;
    }

    /**
     * Get all the vendors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VendorDTO> findAll() {
        log.debug("Request to get all Vendors");
        return vendorRepository.findAll().stream()
            .map(vendorMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one vendor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<VendorDTO> findOne(Long id) {
        log.debug("Request to get Vendor : {}", id);
        return vendorRepository.findById(id)
            .map(vendorMapper::toDto);
    }

    /**
     * Delete the vendor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Vendor : {}", id);
        vendorRepository.deleteById(id);
        vendorSearchRepository.deleteById(id);
    }

    /**
     * Search for the vendor corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VendorDTO> search(String query) {
        log.debug("Request to search Vendors for query {}", query);
        return StreamSupport
            .stream(vendorSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(vendorMapper::toDto)
            .collect(Collectors.toList());
    }
}
