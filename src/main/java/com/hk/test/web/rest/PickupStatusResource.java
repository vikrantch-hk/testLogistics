package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.PickupStatus;
import com.hk.test.repository.PickupStatusRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.PickupStatusDTO;
import com.hk.test.service.mapper.PickupStatusMapper;
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
 * REST controller for managing PickupStatus.
 */
@RestController
@RequestMapping("/api")
public class PickupStatusResource {

    private final Logger log = LoggerFactory.getLogger(PickupStatusResource.class);

    private static final String ENTITY_NAME = "pickupStatus";

    private final PickupStatusRepository pickupStatusRepository;

    private final PickupStatusMapper pickupStatusMapper;

    public PickupStatusResource(PickupStatusRepository pickupStatusRepository, PickupStatusMapper pickupStatusMapper) {
        this.pickupStatusRepository = pickupStatusRepository;
        this.pickupStatusMapper = pickupStatusMapper;
    }

    /**
     * POST  /pickup-statuses : Create a new pickupStatus.
     *
     * @param pickupStatusDTO the pickupStatusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pickupStatusDTO, or with status 400 (Bad Request) if the pickupStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pickup-statuses")
    @Timed
    public ResponseEntity<PickupStatusDTO> createPickupStatus(@RequestBody PickupStatusDTO pickupStatusDTO) throws URISyntaxException {
        log.debug("REST request to save PickupStatus : {}", pickupStatusDTO);
        if (pickupStatusDTO.getId() != null) {
            throw new BadRequestAlertException("A new pickupStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        PickupStatus pickupStatus = pickupStatusMapper.toEntity(pickupStatusDTO);
        pickupStatus = pickupStatusRepository.save(pickupStatus);
        PickupStatusDTO result = pickupStatusMapper.toDto(pickupStatus);
        return ResponseEntity.created(new URI("/api/pickup-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pickup-statuses : Updates an existing pickupStatus.
     *
     * @param pickupStatusDTO the pickupStatusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pickupStatusDTO,
     * or with status 400 (Bad Request) if the pickupStatusDTO is not valid,
     * or with status 500 (Internal Server Error) if the pickupStatusDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pickup-statuses")
    @Timed
    public ResponseEntity<PickupStatusDTO> updatePickupStatus(@RequestBody PickupStatusDTO pickupStatusDTO) throws URISyntaxException {
        log.debug("REST request to update PickupStatus : {}", pickupStatusDTO);
        if (pickupStatusDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        PickupStatus pickupStatus = pickupStatusMapper.toEntity(pickupStatusDTO);
        pickupStatus = pickupStatusRepository.save(pickupStatus);
        PickupStatusDTO result = pickupStatusMapper.toDto(pickupStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pickupStatusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pickup-statuses : get all the pickupStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pickupStatuses in body
     */
    @GetMapping("/pickup-statuses")
    @Timed
    public List<PickupStatusDTO> getAllPickupStatuses() {
        log.debug("REST request to get all PickupStatuses");
        List<PickupStatus> pickupStatuses = pickupStatusRepository.findAll();
        return pickupStatusMapper.toDto(pickupStatuses);
    }

    /**
     * GET  /pickup-statuses/:id : get the "id" pickupStatus.
     *
     * @param id the id of the pickupStatusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pickupStatusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pickup-statuses/{id}")
    @Timed
    public ResponseEntity<PickupStatusDTO> getPickupStatus(@PathVariable Long id) {
        log.debug("REST request to get PickupStatus : {}", id);
        Optional<PickupStatusDTO> pickupStatusDTO = pickupStatusRepository.findById(id)
            .map(pickupStatusMapper::toDto);
        return ResponseUtil.wrapOrNotFound(pickupStatusDTO);
    }

    /**
     * DELETE  /pickup-statuses/:id : delete the "id" pickupStatus.
     *
     * @param id the id of the pickupStatusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pickup-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deletePickupStatus(@PathVariable Long id) {
        log.debug("REST request to delete PickupStatus : {}", id);
        pickupStatusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
