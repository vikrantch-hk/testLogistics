package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.Hub;
import com.hk.test.repository.HubRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.HubDTO;
import com.hk.test.service.mapper.HubMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Hub.
 */
@RestController
@RequestMapping("/api")
public class HubResource {

    private final Logger log = LoggerFactory.getLogger(HubResource.class);

    private static final String ENTITY_NAME = "hub";

    private final HubRepository hubRepository;

    private final HubMapper hubMapper;

    public HubResource(HubRepository hubRepository, HubMapper hubMapper) {
        this.hubRepository = hubRepository;
        this.hubMapper = hubMapper;
    }

    /**
     * POST  /hubs : Create a new hub.
     *
     * @param hubDTO the hubDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new hubDTO, or with status 400 (Bad Request) if the hub has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/hubs")
    @Timed
    public ResponseEntity<HubDTO> createHub(@Valid @RequestBody HubDTO hubDTO) throws URISyntaxException {
        log.debug("REST request to save Hub : {}", hubDTO);
        if (hubDTO.getId() != null) {
            throw new BadRequestAlertException("A new hub cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Hub hub = hubMapper.toEntity(hubDTO);
        hub = hubRepository.save(hub);
        HubDTO result = hubMapper.toDto(hub);
        return ResponseEntity.created(new URI("/api/hubs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /hubs : Updates an existing hub.
     *
     * @param hubDTO the hubDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated hubDTO,
     * or with status 400 (Bad Request) if the hubDTO is not valid,
     * or with status 500 (Internal Server Error) if the hubDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/hubs")
    @Timed
    public ResponseEntity<HubDTO> updateHub(@Valid @RequestBody HubDTO hubDTO) throws URISyntaxException {
        log.debug("REST request to update Hub : {}", hubDTO);
        if (hubDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Hub hub = hubMapper.toEntity(hubDTO);
        hub = hubRepository.save(hub);
        HubDTO result = hubMapper.toDto(hub);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, hubDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /hubs : get all the hubs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of hubs in body
     */
    @GetMapping("/hubs")
    @Timed
    public List<HubDTO> getAllHubs() {
        log.debug("REST request to get all Hubs");
        List<Hub> hubs = hubRepository.findAll();
        return hubMapper.toDto(hubs);
    }

    /**
     * GET  /hubs/:id : get the "id" hub.
     *
     * @param id the id of the hubDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the hubDTO, or with status 404 (Not Found)
     */
    @GetMapping("/hubs/{id}")
    @Timed
    public ResponseEntity<HubDTO> getHub(@PathVariable Long id) {
        log.debug("REST request to get Hub : {}", id);
        Optional<HubDTO> hubDTO = hubRepository.findById(id)
            .map(hubMapper::toDto);
        return ResponseUtil.wrapOrNotFound(hubDTO);
    }

    /**
     * DELETE  /hubs/:id : delete the "id" hub.
     *
     * @param id the id of the hubDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/hubs/{id}")
    @Timed
    public ResponseEntity<Void> deleteHub(@PathVariable Long id) {
        log.debug("REST request to delete Hub : {}", id);
        hubRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
