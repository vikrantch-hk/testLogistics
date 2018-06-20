package com.hk.logistics.service.impl;

import com.hk.logistics.service.CourierAttributesService;
import com.hk.logistics.domain.CourierAttributes;
import com.hk.logistics.repository.CourierAttributesRepository;
import com.hk.logistics.repository.search.CourierAttributesSearchRepository;
import com.hk.logistics.service.dto.CourierAttributesDTO;
import com.hk.logistics.service.mapper.CourierAttributesMapper;
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
 * Service Implementation for managing CourierAttributes.
 */
@Service
@Transactional
public class CourierAttributesServiceImpl implements CourierAttributesService {

    private final Logger log = LoggerFactory.getLogger(CourierAttributesServiceImpl.class);

    private final CourierAttributesRepository courierAttributesRepository;

    private final CourierAttributesMapper courierAttributesMapper;

    private final CourierAttributesSearchRepository courierAttributesSearchRepository;

    public CourierAttributesServiceImpl(CourierAttributesRepository courierAttributesRepository, CourierAttributesMapper courierAttributesMapper, CourierAttributesSearchRepository courierAttributesSearchRepository) {
        this.courierAttributesRepository = courierAttributesRepository;
        this.courierAttributesMapper = courierAttributesMapper;
        this.courierAttributesSearchRepository = courierAttributesSearchRepository;
    }

    /**
     * Save a courierAttributes.
     *
     * @param courierAttributesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CourierAttributesDTO save(CourierAttributesDTO courierAttributesDTO) {
        log.debug("Request to save CourierAttributes : {}", courierAttributesDTO);
        CourierAttributes courierAttributes = courierAttributesMapper.toEntity(courierAttributesDTO);
        courierAttributes = courierAttributesRepository.save(courierAttributes);
        CourierAttributesDTO result = courierAttributesMapper.toDto(courierAttributes);
        courierAttributesSearchRepository.save(courierAttributes);
        return result;
    }

    /**
     * Get all the courierAttributes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CourierAttributesDTO> findAll() {
        log.debug("Request to get all CourierAttributes");
        return courierAttributesRepository.findAll().stream()
            .map(courierAttributesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one courierAttributes by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CourierAttributesDTO> findOne(Long id) {
        log.debug("Request to get CourierAttributes : {}", id);
        return courierAttributesRepository.findById(id)
            .map(courierAttributesMapper::toDto);
    }

    /**
     * Delete the courierAttributes by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CourierAttributes : {}", id);
        courierAttributesRepository.deleteById(id);
        courierAttributesSearchRepository.deleteById(id);
    }

    /**
     * Search for the courierAttributes corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CourierAttributesDTO> search(String query) {
        log.debug("Request to search CourierAttributes for query {}", query);
        return StreamSupport
            .stream(courierAttributesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(courierAttributesMapper::toDto)
            .collect(Collectors.toList());
    }
}
