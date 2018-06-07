package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.CityCourierTAT;
import com.hk.test.repository.CityCourierTATRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.CityCourierTATDTO;
import com.hk.test.service.mapper.CityCourierTATMapper;
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
 * REST controller for managing CityCourierTAT.
 */
@RestController
@RequestMapping("/api")
public class CityCourierTATResource {

    private final Logger log = LoggerFactory.getLogger(CityCourierTATResource.class);

    private static final String ENTITY_NAME = "cityCourierTAT";

    private final CityCourierTATRepository cityCourierTATRepository;

    private final CityCourierTATMapper cityCourierTATMapper;

    public CityCourierTATResource(CityCourierTATRepository cityCourierTATRepository, CityCourierTATMapper cityCourierTATMapper) {
        this.cityCourierTATRepository = cityCourierTATRepository;
        this.cityCourierTATMapper = cityCourierTATMapper;
    }

    /**
     * POST  /city-courier-tats : Create a new cityCourierTAT.
     *
     * @param cityCourierTATDTO the cityCourierTATDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cityCourierTATDTO, or with status 400 (Bad Request) if the cityCourierTAT has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/city-courier-tats")
    @Timed
    public ResponseEntity<CityCourierTATDTO> createCityCourierTAT(@RequestBody CityCourierTATDTO cityCourierTATDTO) throws URISyntaxException {
        log.debug("REST request to save CityCourierTAT : {}", cityCourierTATDTO);
        if (cityCourierTATDTO.getId() != null) {
            throw new BadRequestAlertException("A new cityCourierTAT cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        CityCourierTAT cityCourierTAT = cityCourierTATMapper.toEntity(cityCourierTATDTO);
        cityCourierTAT = cityCourierTATRepository.save(cityCourierTAT);
        CityCourierTATDTO result = cityCourierTATMapper.toDto(cityCourierTAT);
        return ResponseEntity.created(new URI("/api/city-courier-tats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /city-courier-tats : Updates an existing cityCourierTAT.
     *
     * @param cityCourierTATDTO the cityCourierTATDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cityCourierTATDTO,
     * or with status 400 (Bad Request) if the cityCourierTATDTO is not valid,
     * or with status 500 (Internal Server Error) if the cityCourierTATDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/city-courier-tats")
    @Timed
    public ResponseEntity<CityCourierTATDTO> updateCityCourierTAT(@RequestBody CityCourierTATDTO cityCourierTATDTO) throws URISyntaxException {
        log.debug("REST request to update CityCourierTAT : {}", cityCourierTATDTO);
        if (cityCourierTATDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        CityCourierTAT cityCourierTAT = cityCourierTATMapper.toEntity(cityCourierTATDTO);
        cityCourierTAT = cityCourierTATRepository.save(cityCourierTAT);
        CityCourierTATDTO result = cityCourierTATMapper.toDto(cityCourierTAT);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cityCourierTATDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /city-courier-tats : get all the cityCourierTATS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cityCourierTATS in body
     */
    @GetMapping("/city-courier-tats")
    @Timed
    public List<CityCourierTATDTO> getAllCityCourierTATS() {
        log.debug("REST request to get all CityCourierTATS");
        List<CityCourierTAT> cityCourierTATS = cityCourierTATRepository.findAll();
        return cityCourierTATMapper.toDto(cityCourierTATS);
    }

    /**
     * GET  /city-courier-tats/:id : get the "id" cityCourierTAT.
     *
     * @param id the id of the cityCourierTATDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cityCourierTATDTO, or with status 404 (Not Found)
     */
    @GetMapping("/city-courier-tats/{id}")
    @Timed
    public ResponseEntity<CityCourierTATDTO> getCityCourierTAT(@PathVariable Long id) {
        log.debug("REST request to get CityCourierTAT : {}", id);
        Optional<CityCourierTATDTO> cityCourierTATDTO = cityCourierTATRepository.findById(id)
            .map(cityCourierTATMapper::toDto);
        return ResponseUtil.wrapOrNotFound(cityCourierTATDTO);
    }

    /**
     * DELETE  /city-courier-tats/:id : delete the "id" cityCourierTAT.
     *
     * @param id the id of the cityCourierTATDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/city-courier-tats/{id}")
    @Timed
    public ResponseEntity<Void> deleteCityCourierTAT(@PathVariable Long id) {
        log.debug("REST request to delete CityCourierTAT : {}", id);
        cityCourierTATRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
