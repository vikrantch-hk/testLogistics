package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.Awb;
import com.hk.test.repository.AwbRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.AwbDTO;
import com.hk.test.service.mapper.AwbMapper;
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
 * REST controller for managing Awb.
 */
@RestController
@RequestMapping("/api")
public class AwbResource {

    private final Logger log = LoggerFactory.getLogger(AwbResource.class);

    private static final String ENTITY_NAME = "awb";

    private final AwbRepository awbRepository;

    private final AwbMapper awbMapper;

    public AwbResource(AwbRepository awbRepository, AwbMapper awbMapper) {
        this.awbRepository = awbRepository;
        this.awbMapper = awbMapper;
    }

    /**
     * POST  /awbs : Create a new awb.
     *
     * @param awbDTO the awbDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new awbDTO, or with status 400 (Bad Request) if the awb has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/awbs")
    @Timed
    public ResponseEntity<AwbDTO> createAwb(@Valid @RequestBody AwbDTO awbDTO) throws URISyntaxException {
        log.debug("REST request to save Awb : {}", awbDTO);
        if (awbDTO.getId() != null) {
            throw new BadRequestAlertException("A new awb cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Awb awb = awbMapper.toEntity(awbDTO);
        awb = awbRepository.save(awb);
        AwbDTO result = awbMapper.toDto(awb);
        return ResponseEntity.created(new URI("/api/awbs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /awbs : Updates an existing awb.
     *
     * @param awbDTO the awbDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated awbDTO,
     * or with status 400 (Bad Request) if the awbDTO is not valid,
     * or with status 500 (Internal Server Error) if the awbDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/awbs")
    @Timed
    public ResponseEntity<AwbDTO> updateAwb(@Valid @RequestBody AwbDTO awbDTO) throws URISyntaxException {
        log.debug("REST request to update Awb : {}", awbDTO);
        if (awbDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Awb awb = awbMapper.toEntity(awbDTO);
        awb = awbRepository.save(awb);
        AwbDTO result = awbMapper.toDto(awb);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, awbDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /awbs : get all the awbs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of awbs in body
     */
    @GetMapping("/awbs")
    @Timed
    public List<AwbDTO> getAllAwbs() {
        log.debug("REST request to get all Awbs");
        List<Awb> awbs = awbRepository.findAll();
        return awbMapper.toDto(awbs);
    }

    /**
     * GET  /awbs/:id : get the "id" awb.
     *
     * @param id the id of the awbDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the awbDTO, or with status 404 (Not Found)
     */
    @GetMapping("/awbs/{id}")
    @Timed
    public ResponseEntity<AwbDTO> getAwb(@PathVariable Long id) {
        log.debug("REST request to get Awb : {}", id);
        Optional<AwbDTO> awbDTO = awbRepository.findById(id)
            .map(awbMapper::toDto);
        return ResponseUtil.wrapOrNotFound(awbDTO);
    }

    /**
     * DELETE  /awbs/:id : delete the "id" awb.
     *
     * @param id the id of the awbDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/awbs/{id}")
    @Timed
    public ResponseEntity<Void> deleteAwb(@PathVariable Long id) {
        log.debug("REST request to delete Awb : {}", id);
        awbRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
