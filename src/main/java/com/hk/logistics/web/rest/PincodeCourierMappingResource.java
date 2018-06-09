package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.domain.PincodeCourierMapping;
import com.hk.logistics.repository.PincodeCourierMappingRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.PincodeCourierMappingDTO;
import com.hk.logistics.service.mapper.PincodeCourierMappingMapper;
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
 * REST controller for managing PincodeCourierMapping.
 */
@RestController
@RequestMapping("/api")
public class PincodeCourierMappingResource {

    private final Logger log = LoggerFactory.getLogger(PincodeCourierMappingResource.class);

    private static final String ENTITY_NAME = "pincodeCourierMapping";

    private final PincodeCourierMappingRepository pincodeCourierMappingRepository;

    private final PincodeCourierMappingMapper pincodeCourierMappingMapper;

    public PincodeCourierMappingResource(PincodeCourierMappingRepository pincodeCourierMappingRepository, PincodeCourierMappingMapper pincodeCourierMappingMapper) {
        this.pincodeCourierMappingRepository = pincodeCourierMappingRepository;
        this.pincodeCourierMappingMapper = pincodeCourierMappingMapper;
    }

    /**
     * POST  /pincode-courier-mappings : Create a new pincodeCourierMapping.
     *
     * @param pincodeCourierMappingDTO the pincodeCourierMappingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pincodeCourierMappingDTO, or with status 400 (Bad Request) if the pincodeCourierMapping has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pincode-courier-mappings")
    @Timed
    public ResponseEntity<PincodeCourierMappingDTO> createPincodeCourierMapping(@Valid @RequestBody PincodeCourierMappingDTO pincodeCourierMappingDTO) throws URISyntaxException {
        log.debug("REST request to save PincodeCourierMapping : {}", pincodeCourierMappingDTO);
        if (pincodeCourierMappingDTO.getId() != null) {
            throw new BadRequestAlertException("A new pincodeCourierMapping cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        PincodeCourierMapping pincodeCourierMapping = pincodeCourierMappingMapper.toEntity(pincodeCourierMappingDTO);
        pincodeCourierMapping = pincodeCourierMappingRepository.save(pincodeCourierMapping);
        PincodeCourierMappingDTO result = pincodeCourierMappingMapper.toDto(pincodeCourierMapping);
        return ResponseEntity.created(new URI("/api/pincode-courier-mappings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pincode-courier-mappings : Updates an existing pincodeCourierMapping.
     *
     * @param pincodeCourierMappingDTO the pincodeCourierMappingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pincodeCourierMappingDTO,
     * or with status 400 (Bad Request) if the pincodeCourierMappingDTO is not valid,
     * or with status 500 (Internal Server Error) if the pincodeCourierMappingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pincode-courier-mappings")
    @Timed
    public ResponseEntity<PincodeCourierMappingDTO> updatePincodeCourierMapping(@Valid @RequestBody PincodeCourierMappingDTO pincodeCourierMappingDTO) throws URISyntaxException {
        log.debug("REST request to update PincodeCourierMapping : {}", pincodeCourierMappingDTO);
        if (pincodeCourierMappingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        PincodeCourierMapping pincodeCourierMapping = pincodeCourierMappingMapper.toEntity(pincodeCourierMappingDTO);
        pincodeCourierMapping = pincodeCourierMappingRepository.save(pincodeCourierMapping);
        PincodeCourierMappingDTO result = pincodeCourierMappingMapper.toDto(pincodeCourierMapping);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pincodeCourierMappingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pincode-courier-mappings : get all the pincodeCourierMappings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pincodeCourierMappings in body
     */
    @GetMapping("/pincode-courier-mappings")
    @Timed
    public List<PincodeCourierMappingDTO> getAllPincodeCourierMappings() {
        log.debug("REST request to get all PincodeCourierMappings");
        List<PincodeCourierMapping> pincodeCourierMappings = pincodeCourierMappingRepository.findAll();
        return pincodeCourierMappingMapper.toDto(pincodeCourierMappings);
    }

    /**
     * GET  /pincode-courier-mappings/:id : get the "id" pincodeCourierMapping.
     *
     * @param id the id of the pincodeCourierMappingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pincodeCourierMappingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pincode-courier-mappings/{id}")
    @Timed
    public ResponseEntity<PincodeCourierMappingDTO> getPincodeCourierMapping(@PathVariable Long id) {
        log.debug("REST request to get PincodeCourierMapping : {}", id);
        Optional<PincodeCourierMappingDTO> pincodeCourierMappingDTO = pincodeCourierMappingRepository.findById(id)
            .map(pincodeCourierMappingMapper::toDto);
        return ResponseUtil.wrapOrNotFound(pincodeCourierMappingDTO);
    }

    /**
     * DELETE  /pincode-courier-mappings/:id : delete the "id" pincodeCourierMapping.
     *
     * @param id the id of the pincodeCourierMappingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pincode-courier-mappings/{id}")
    @Timed
    public ResponseEntity<Void> deletePincodeCourierMapping(@PathVariable Long id) {
        log.debug("REST request to delete PincodeCourierMapping : {}", id);
        pincodeCourierMappingRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
