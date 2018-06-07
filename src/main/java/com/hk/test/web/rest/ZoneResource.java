package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.Zone;
import com.hk.test.repository.ZoneRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.ZoneDTO;
import com.hk.test.service.mapper.ZoneMapper;
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
 * REST controller for managing Zone.
 */
@RestController
@RequestMapping("/api")
public class ZoneResource {

    private final Logger log = LoggerFactory.getLogger(ZoneResource.class);

    private static final String ENTITY_NAME = "zone";

    private final ZoneRepository zoneRepository;

    private final ZoneMapper zoneMapper;

    public ZoneResource(ZoneRepository zoneRepository, ZoneMapper zoneMapper) {
        this.zoneRepository = zoneRepository;
        this.zoneMapper = zoneMapper;
    }

    /**
     * POST  /zones : Create a new zone.
     *
     * @param zoneDTO the zoneDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zoneDTO, or with status 400 (Bad Request) if the zone has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/zones")
    @Timed
    public ResponseEntity<ZoneDTO> createZone(@Valid @RequestBody ZoneDTO zoneDTO) throws URISyntaxException {
        log.debug("REST request to save Zone : {}", zoneDTO);
        if (zoneDTO.getId() != null) {
            throw new BadRequestAlertException("A new zone cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Zone zone = zoneMapper.toEntity(zoneDTO);
        zone = zoneRepository.save(zone);
        ZoneDTO result = zoneMapper.toDto(zone);
        return ResponseEntity.created(new URI("/api/zones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /zones : Updates an existing zone.
     *
     * @param zoneDTO the zoneDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zoneDTO,
     * or with status 400 (Bad Request) if the zoneDTO is not valid,
     * or with status 500 (Internal Server Error) if the zoneDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/zones")
    @Timed
    public ResponseEntity<ZoneDTO> updateZone(@Valid @RequestBody ZoneDTO zoneDTO) throws URISyntaxException {
        log.debug("REST request to update Zone : {}", zoneDTO);
        if (zoneDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Zone zone = zoneMapper.toEntity(zoneDTO);
        zone = zoneRepository.save(zone);
        ZoneDTO result = zoneMapper.toDto(zone);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zoneDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /zones : get all the zones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of zones in body
     */
    @GetMapping("/zones")
    @Timed
    public List<ZoneDTO> getAllZones() {
        log.debug("REST request to get all Zones");
        List<Zone> zones = zoneRepository.findAll();
        return zoneMapper.toDto(zones);
    }

    /**
     * GET  /zones/:id : get the "id" zone.
     *
     * @param id the id of the zoneDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zoneDTO, or with status 404 (Not Found)
     */
    @GetMapping("/zones/{id}")
    @Timed
    public ResponseEntity<ZoneDTO> getZone(@PathVariable Long id) {
        log.debug("REST request to get Zone : {}", id);
        Optional<ZoneDTO> zoneDTO = zoneRepository.findById(id)
            .map(zoneMapper::toDto);
        return ResponseUtil.wrapOrNotFound(zoneDTO);
    }

    /**
     * DELETE  /zones/:id : delete the "id" zone.
     *
     * @param id the id of the zoneDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/zones/{id}")
    @Timed
    public ResponseEntity<Void> deleteZone(@PathVariable Long id) {
        log.debug("REST request to delete Zone : {}", id);
        zoneRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
