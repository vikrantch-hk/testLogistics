package com.hk.logistics.service.impl;

import com.hk.logistics.service.ProductSourceDestinationMappingService;
import com.hk.logistics.domain.ProductSourceDestinationMapping;
import com.hk.logistics.repository.ProductSourceDestinationMappingRepository;
import com.hk.logistics.repository.search.ProductSourceDestinationMappingSearchRepository;
import com.hk.logistics.service.dto.ProductSourceDestinationMappingDTO;
import com.hk.logistics.service.mapper.ProductSourceDestinationMappingMapper;
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
 * Service Implementation for managing ProductSourceDestinationMapping.
 */
@Service
@Transactional
public class ProductSourceDestinationMappingServiceImpl implements ProductSourceDestinationMappingService {

    private final Logger log = LoggerFactory.getLogger(ProductSourceDestinationMappingServiceImpl.class);

    private final ProductSourceDestinationMappingRepository productSourceDestinationMappingRepository;

    private final ProductSourceDestinationMappingMapper productSourceDestinationMappingMapper;

    private final ProductSourceDestinationMappingSearchRepository productSourceDestinationMappingSearchRepository;

    public ProductSourceDestinationMappingServiceImpl(ProductSourceDestinationMappingRepository productSourceDestinationMappingRepository, ProductSourceDestinationMappingMapper productSourceDestinationMappingMapper, ProductSourceDestinationMappingSearchRepository productSourceDestinationMappingSearchRepository) {
        this.productSourceDestinationMappingRepository = productSourceDestinationMappingRepository;
        this.productSourceDestinationMappingMapper = productSourceDestinationMappingMapper;
        this.productSourceDestinationMappingSearchRepository = productSourceDestinationMappingSearchRepository;
    }

    /**
     * Save a productSourceDestinationMapping.
     *
     * @param productSourceDestinationMappingDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductSourceDestinationMappingDTO save(ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO) {
        log.debug("Request to save ProductSourceDestinationMapping : {}", productSourceDestinationMappingDTO);
        ProductSourceDestinationMapping productSourceDestinationMapping = productSourceDestinationMappingMapper.toEntity(productSourceDestinationMappingDTO);
        productSourceDestinationMapping = productSourceDestinationMappingRepository.save(productSourceDestinationMapping);
        ProductSourceDestinationMappingDTO result = productSourceDestinationMappingMapper.toDto(productSourceDestinationMapping);
        productSourceDestinationMappingSearchRepository.save(productSourceDestinationMapping);
        return result;
    }

    /**
     * Get all the productSourceDestinationMappings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductSourceDestinationMappingDTO> findAll() {
        log.debug("Request to get all ProductSourceDestinationMappings");
        return productSourceDestinationMappingRepository.findAll().stream()
            .map(productSourceDestinationMappingMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one productSourceDestinationMapping by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductSourceDestinationMappingDTO> findOne(Long id) {
        log.debug("Request to get ProductSourceDestinationMapping : {}", id);
        return productSourceDestinationMappingRepository.findById(id)
            .map(productSourceDestinationMappingMapper::toDto);
    }

    /**
     * Delete the productSourceDestinationMapping by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductSourceDestinationMapping : {}", id);
        productSourceDestinationMappingRepository.deleteById(id);
        productSourceDestinationMappingSearchRepository.deleteById(id);
    }

    /**
     * Search for the productSourceDestinationMapping corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductSourceDestinationMappingDTO> search(String query) {
        log.debug("Request to search ProductSourceDestinationMappings for query {}", query);
        return StreamSupport
            .stream(productSourceDestinationMappingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(productSourceDestinationMappingMapper::toDto)
            .collect(Collectors.toList());
    }
}
