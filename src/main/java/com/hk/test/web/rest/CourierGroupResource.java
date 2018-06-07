package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.CourierGroup;
import com.hk.test.repository.CourierGroupRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.CourierGroupDTO;
import com.hk.test.service.mapper.CourierGroupMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CourierGroup.
 */
@RestController
@RequestMapping("/api")
public class CourierGroupResource {

    private final Logger log = LoggerFactory.getLogger(CourierGroupResource.class);

    private static final String ENTITY_NAME = "courierGroup";

    private final CourierGroupRepository courierGroupRepository;

    private final CourierGroupMapper courierGroupMapper;

    public CourierGroupResource(CourierGroupRepository courierGroupRepository, CourierGroupMapper courierGroupMapper) {
        this.courierGroupRepository = courierGroupRepository;
        this.courierGroupMapper = courierGroupMapper;
    }

    /**
     * POST  /courier-groups : Create a new courierGroup.
     *
     * @param courierGroupDTO the courierGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courierGroupDTO, or with status 400 (Bad Request) if the courierGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courier-groups")
    @Timed
    public ResponseEntity<CourierGroupDTO> createCourierGroup(@RequestBody CourierGroupDTO courierGroupDTO) throws URISyntaxException {
        log.debug("REST request to save CourierGroup : {}", courierGroupDTO);
        if (courierGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new courierGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        CourierGroup courierGroup = courierGroupMapper.toEntity(courierGroupDTO);
        courierGroup = courierGroupRepository.save(courierGroup);
        CourierGroupDTO result = courierGroupMapper.toDto(courierGroup);
        return ResponseEntity.created(new URI("/api/courier-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courier-groups : Updates an existing courierGroup.
     *
     * @param courierGroupDTO the courierGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courierGroupDTO,
     * or with status 400 (Bad Request) if the courierGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the courierGroupDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courier-groups")
    @Timed
    public ResponseEntity<CourierGroupDTO> updateCourierGroup(@RequestBody CourierGroupDTO courierGroupDTO) throws URISyntaxException {
        log.debug("REST request to update CourierGroup : {}", courierGroupDTO);
        if (courierGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        CourierGroup courierGroup = courierGroupMapper.toEntity(courierGroupDTO);
        courierGroup = courierGroupRepository.save(courierGroup);
        CourierGroupDTO result = courierGroupMapper.toDto(courierGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courierGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courier-groups : get all the courierGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courierGroups in body
     */
    @GetMapping("/courier-groups")
    @Timed
    public List<CourierGroupDTO> getAllCourierGroups() {
        log.debug("REST request to get all CourierGroups");
        List<CourierGroup> courierGroups = courierGroupRepository.findAll();
        return courierGroupMapper.toDto(courierGroups);
    }

    /**
     * GET  /courier-groups/:id : get the "id" courierGroup.
     *
     * @param id the id of the courierGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courierGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/courier-groups/{id}")
    @Timed
    public ResponseEntity<CourierGroupDTO> getCourierGroup(@PathVariable Long id) {
        log.debug("REST request to get CourierGroup : {}", id);
        Optional<CourierGroupDTO> courierGroupDTO = courierGroupRepository.findById(id)
            .map(courierGroupMapper::toDto);
        return ResponseUtil.wrapOrNotFound(courierGroupDTO);
    }

    /**
     * DELETE  /courier-groups/:id : delete the "id" courierGroup.
     *
     * @param id the id of the courierGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courier-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourierGroup(@PathVariable Long id) {
        log.debug("REST request to delete CourierGroup : {}", id);
        courierGroupRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
