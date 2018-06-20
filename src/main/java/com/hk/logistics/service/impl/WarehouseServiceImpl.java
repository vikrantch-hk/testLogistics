package com.hk.logistics.service.impl;

import com.hk.logistics.service.WarehouseService;
import com.hk.logistics.domain.Warehouse;
import com.hk.logistics.repository.WarehouseRepository;
import com.hk.logistics.repository.search.WarehouseSearchRepository;
import com.hk.logistics.service.dto.WarehouseDTO;
import com.hk.logistics.service.mapper.WarehouseMapper;
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
 * Service Implementation for managing Warehouse.
 */
@Service
@Transactional
public class WarehouseServiceImpl implements WarehouseService {

    private final Logger log = LoggerFactory.getLogger(WarehouseServiceImpl.class);

    private final WarehouseRepository warehouseRepository;

    private final WarehouseMapper warehouseMapper;

    private final WarehouseSearchRepository warehouseSearchRepository;

    public WarehouseServiceImpl(WarehouseRepository warehouseRepository, WarehouseMapper warehouseMapper, WarehouseSearchRepository warehouseSearchRepository) {
        this.warehouseRepository = warehouseRepository;
        this.warehouseMapper = warehouseMapper;
        this.warehouseSearchRepository = warehouseSearchRepository;
    }

    /**
     * Save a warehouse.
     *
     * @param warehouseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public WarehouseDTO save(WarehouseDTO warehouseDTO) {
        log.debug("Request to save Warehouse : {}", warehouseDTO);
        Warehouse warehouse = warehouseMapper.toEntity(warehouseDTO);
        warehouse = warehouseRepository.save(warehouse);
        WarehouseDTO result = warehouseMapper.toDto(warehouse);
        warehouseSearchRepository.save(warehouse);
        return result;
    }

    /**
     * Get all the warehouses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<WarehouseDTO> findAll() {
        log.debug("Request to get all Warehouses");
        return warehouseRepository.findAll().stream()
            .map(warehouseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one warehouse by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<WarehouseDTO> findOne(Long id) {
        log.debug("Request to get Warehouse : {}", id);
        return warehouseRepository.findById(id)
            .map(warehouseMapper::toDto);
    }

    /**
     * Delete the warehouse by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Warehouse : {}", id);
        warehouseRepository.deleteById(id);
        warehouseSearchRepository.deleteById(id);
    }

    /**
     * Search for the warehouse corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<WarehouseDTO> search(String query) {
        log.debug("Request to search Warehouses for query {}", query);
        return StreamSupport
            .stream(warehouseSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(warehouseMapper::toDto)
            .collect(Collectors.toList());
    }
}
