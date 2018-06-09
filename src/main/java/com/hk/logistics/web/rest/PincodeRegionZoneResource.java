package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.domain.PincodeRegionZone;
import com.hk.logistics.repository.PincodeRegionZoneRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.PincodeRegionZoneDTO;
import com.hk.logistics.service.mapper.PincodeRegionZoneMapper;
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
 * REST controller for managing PincodeRegionZone.
 */
@RestController
@RequestMapping("/api")
public class PincodeRegionZoneResource {

    private final Logger log = LoggerFactory.getLogger(PincodeRegionZoneResource.class);

    private static final String ENTITY_NAME = "pincodeRegionZone";

    private final PincodeRegionZoneRepository pincodeRegionZoneRepository;

    private final PincodeRegionZoneMapper pincodeRegionZoneMapper;

    public PincodeRegionZoneResource(PincodeRegionZoneRepository pincodeRegionZoneRepository, PincodeRegionZoneMapper pincodeRegionZoneMapper) {
        this.pincodeRegionZoneRepository = pincodeRegionZoneRepository;
        this.pincodeRegionZoneMapper = pincodeRegionZoneMapper;
    }

    /**
     * POST  /pincode-region-zones : Create a new pincodeRegionZone.
     *
     * @param pincodeRegionZoneDTO the pincodeRegionZoneDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pincodeRegionZoneDTO, or with status 400 (Bad Request) if the pincodeRegionZone has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pincode-region-zones")
    @Timed
    public ResponseEntity<PincodeRegionZoneDTO> createPincodeRegionZone(@RequestBody PincodeRegionZoneDTO pincodeRegionZoneDTO) throws URISyntaxException {
        log.debug("REST request to save PincodeRegionZone : {}", pincodeRegionZoneDTO);
        if (pincodeRegionZoneDTO.getId() != null) {
            throw new BadRequestAlertException("A new pincodeRegionZone cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        PincodeRegionZone pincodeRegionZone = pincodeRegionZoneMapper.toEntity(pincodeRegionZoneDTO);
        pincodeRegionZone = pincodeRegionZoneRepository.save(pincodeRegionZone);
        PincodeRegionZoneDTO result = pincodeRegionZoneMapper.toDto(pincodeRegionZone);
        return ResponseEntity.created(new URI("/api/pincode-region-zones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pincode-region-zones : Updates an existing pincodeRegionZone.
     *
     * @param pincodeRegionZoneDTO the pincodeRegionZoneDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pincodeRegionZoneDTO,
     * or with status 400 (Bad Request) if the pincodeRegionZoneDTO is not valid,
     * or with status 500 (Internal Server Error) if the pincodeRegionZoneDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pincode-region-zones")
    @Timed
    public ResponseEntity<PincodeRegionZoneDTO> updatePincodeRegionZone(@RequestBody PincodeRegionZoneDTO pincodeRegionZoneDTO) throws URISyntaxException {
        log.debug("REST request to update PincodeRegionZone : {}", pincodeRegionZoneDTO);
        if (pincodeRegionZoneDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        PincodeRegionZone pincodeRegionZone = pincodeRegionZoneMapper.toEntity(pincodeRegionZoneDTO);
        pincodeRegionZone = pincodeRegionZoneRepository.save(pincodeRegionZone);
        PincodeRegionZoneDTO result = pincodeRegionZoneMapper.toDto(pincodeRegionZone);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pincodeRegionZoneDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pincode-region-zones : get all the pincodeRegionZones.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pincodeRegionZones in body
     */
    @GetMapping("/pincode-region-zones")
    @Timed
    public List<PincodeRegionZoneDTO> getAllPincodeRegionZones() {
        log.debug("REST request to get all PincodeRegionZones");
        List<PincodeRegionZone> pincodeRegionZones = pincodeRegionZoneRepository.findAll();
        return pincodeRegionZoneMapper.toDto(pincodeRegionZones);
    }

    /**
     * GET  /pincode-region-zones/:id : get the "id" pincodeRegionZone.
     *
     * @param id the id of the pincodeRegionZoneDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pincodeRegionZoneDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pincode-region-zones/{id}")
    @Timed
    public ResponseEntity<PincodeRegionZoneDTO> getPincodeRegionZone(@PathVariable Long id) {
        log.debug("REST request to get PincodeRegionZone : {}", id);
        Optional<PincodeRegionZoneDTO> pincodeRegionZoneDTO = pincodeRegionZoneRepository.findById(id)
            .map(pincodeRegionZoneMapper::toDto);
        return ResponseUtil.wrapOrNotFound(pincodeRegionZoneDTO);
    }

    /**
     * DELETE  /pincode-region-zones/:id : delete the "id" pincodeRegionZone.
     *
     * @param id the id of the pincodeRegionZoneDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pincode-region-zones/{id}")
    @Timed
    public ResponseEntity<Void> deletePincodeRegionZone(@PathVariable Long id) {
        log.debug("REST request to delete PincodeRegionZone : {}", id);
        pincodeRegionZoneRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
