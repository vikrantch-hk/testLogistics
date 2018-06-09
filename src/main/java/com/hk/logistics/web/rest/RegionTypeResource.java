package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.domain.RegionType;
import com.hk.logistics.repository.RegionTypeRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.RegionTypeDTO;
import com.hk.logistics.service.mapper.RegionTypeMapper;
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
 * REST controller for managing RegionType.
 */
@RestController
@RequestMapping("/api")
public class RegionTypeResource {

    private final Logger log = LoggerFactory.getLogger(RegionTypeResource.class);

    private static final String ENTITY_NAME = "regionType";

    private final RegionTypeRepository regionTypeRepository;

    private final RegionTypeMapper regionTypeMapper;

    public RegionTypeResource(RegionTypeRepository regionTypeRepository, RegionTypeMapper regionTypeMapper) {
        this.regionTypeRepository = regionTypeRepository;
        this.regionTypeMapper = regionTypeMapper;
    }

    /**
     * POST  /region-types : Create a new regionType.
     *
     * @param regionTypeDTO the regionTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new regionTypeDTO, or with status 400 (Bad Request) if the regionType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/region-types")
    @Timed
    public ResponseEntity<RegionTypeDTO> createRegionType(@RequestBody RegionTypeDTO regionTypeDTO) throws URISyntaxException {
        log.debug("REST request to save RegionType : {}", regionTypeDTO);
        if (regionTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new regionType cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        RegionType regionType = regionTypeMapper.toEntity(regionTypeDTO);
        regionType = regionTypeRepository.save(regionType);
        RegionTypeDTO result = regionTypeMapper.toDto(regionType);
        return ResponseEntity.created(new URI("/api/region-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /region-types : Updates an existing regionType.
     *
     * @param regionTypeDTO the regionTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated regionTypeDTO,
     * or with status 400 (Bad Request) if the regionTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the regionTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/region-types")
    @Timed
    public ResponseEntity<RegionTypeDTO> updateRegionType(@RequestBody RegionTypeDTO regionTypeDTO) throws URISyntaxException {
        log.debug("REST request to update RegionType : {}", regionTypeDTO);
        if (regionTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        RegionType regionType = regionTypeMapper.toEntity(regionTypeDTO);
        regionType = regionTypeRepository.save(regionType);
        RegionTypeDTO result = regionTypeMapper.toDto(regionType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, regionTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /region-types : get all the regionTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of regionTypes in body
     */
    @GetMapping("/region-types")
    @Timed
    public List<RegionTypeDTO> getAllRegionTypes() {
        log.debug("REST request to get all RegionTypes");
        List<RegionType> regionTypes = regionTypeRepository.findAll();
        return regionTypeMapper.toDto(regionTypes);
    }

    /**
     * GET  /region-types/:id : get the "id" regionType.
     *
     * @param id the id of the regionTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the regionTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/region-types/{id}")
    @Timed
    public ResponseEntity<RegionTypeDTO> getRegionType(@PathVariable Long id) {
        log.debug("REST request to get RegionType : {}", id);
        Optional<RegionTypeDTO> regionTypeDTO = regionTypeRepository.findById(id)
            .map(regionTypeMapper::toDto);
        return ResponseUtil.wrapOrNotFound(regionTypeDTO);
    }

    /**
     * DELETE  /region-types/:id : delete the "id" regionType.
     *
     * @param id the id of the regionTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/region-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegionType(@PathVariable Long id) {
        log.debug("REST request to delete RegionType : {}", id);
        regionTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
