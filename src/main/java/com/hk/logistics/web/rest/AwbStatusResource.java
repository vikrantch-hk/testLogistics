package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.domain.AwbStatus;
import com.hk.logistics.repository.AwbStatusRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.AwbStatusDTO;
import com.hk.logistics.service.mapper.AwbStatusMapper;
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
 * REST controller for managing AwbStatus.
 */
@RestController
@RequestMapping("/api")
public class AwbStatusResource {

    private final Logger log = LoggerFactory.getLogger(AwbStatusResource.class);

    private static final String ENTITY_NAME = "awbStatus";

    private final AwbStatusRepository awbStatusRepository;

    private final AwbStatusMapper awbStatusMapper;

    public AwbStatusResource(AwbStatusRepository awbStatusRepository, AwbStatusMapper awbStatusMapper) {
        this.awbStatusRepository = awbStatusRepository;
        this.awbStatusMapper = awbStatusMapper;
    }

    /**
     * POST  /awb-statuses : Create a new awbStatus.
     *
     * @param awbStatusDTO the awbStatusDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new awbStatusDTO, or with status 400 (Bad Request) if the awbStatus has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/awb-statuses")
    @Timed
    public ResponseEntity<AwbStatusDTO> createAwbStatus(@RequestBody AwbStatusDTO awbStatusDTO) throws URISyntaxException {
        log.debug("REST request to save AwbStatus : {}", awbStatusDTO);
        if (awbStatusDTO.getId() != null) {
            throw new BadRequestAlertException("A new awbStatus cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        AwbStatus awbStatus = awbStatusMapper.toEntity(awbStatusDTO);
        awbStatus = awbStatusRepository.save(awbStatus);
        AwbStatusDTO result = awbStatusMapper.toDto(awbStatus);
        return ResponseEntity.created(new URI("/api/awb-statuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /awb-statuses : Updates an existing awbStatus.
     *
     * @param awbStatusDTO the awbStatusDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated awbStatusDTO,
     * or with status 400 (Bad Request) if the awbStatusDTO is not valid,
     * or with status 500 (Internal Server Error) if the awbStatusDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/awb-statuses")
    @Timed
    public ResponseEntity<AwbStatusDTO> updateAwbStatus(@RequestBody AwbStatusDTO awbStatusDTO) throws URISyntaxException {
        log.debug("REST request to update AwbStatus : {}", awbStatusDTO);
        if (awbStatusDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        AwbStatus awbStatus = awbStatusMapper.toEntity(awbStatusDTO);
        awbStatus = awbStatusRepository.save(awbStatus);
        AwbStatusDTO result = awbStatusMapper.toDto(awbStatus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, awbStatusDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /awb-statuses : get all the awbStatuses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of awbStatuses in body
     */
    @GetMapping("/awb-statuses")
    @Timed
    public List<AwbStatusDTO> getAllAwbStatuses() {
        log.debug("REST request to get all AwbStatuses");
        List<AwbStatus> awbStatuses = awbStatusRepository.findAll();
        return awbStatusMapper.toDto(awbStatuses);
    }

    /**
     * GET  /awb-statuses/:id : get the "id" awbStatus.
     *
     * @param id the id of the awbStatusDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the awbStatusDTO, or with status 404 (Not Found)
     */
    @GetMapping("/awb-statuses/{id}")
    @Timed
    public ResponseEntity<AwbStatusDTO> getAwbStatus(@PathVariable Long id) {
        log.debug("REST request to get AwbStatus : {}", id);
        Optional<AwbStatusDTO> awbStatusDTO = awbStatusRepository.findById(id)
            .map(awbStatusMapper::toDto);
        return ResponseUtil.wrapOrNotFound(awbStatusDTO);
    }

    /**
     * DELETE  /awb-statuses/:id : delete the "id" awbStatus.
     *
     * @param id the id of the awbStatusDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/awb-statuses/{id}")
    @Timed
    public ResponseEntity<Void> deleteAwbStatus(@PathVariable Long id) {
        log.debug("REST request to delete AwbStatus : {}", id);
        awbStatusRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
