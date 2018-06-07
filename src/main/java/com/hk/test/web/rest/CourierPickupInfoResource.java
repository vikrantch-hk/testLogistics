package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.CourierPickupInfo;
import com.hk.test.repository.CourierPickupInfoRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.CourierPickupInfoDTO;
import com.hk.test.service.mapper.CourierPickupInfoMapper;
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
 * REST controller for managing CourierPickupInfo.
 */
@RestController
@RequestMapping("/api")
public class CourierPickupInfoResource {

    private final Logger log = LoggerFactory.getLogger(CourierPickupInfoResource.class);

    private static final String ENTITY_NAME = "courierPickupInfo";

    private final CourierPickupInfoRepository courierPickupInfoRepository;

    private final CourierPickupInfoMapper courierPickupInfoMapper;

    public CourierPickupInfoResource(CourierPickupInfoRepository courierPickupInfoRepository, CourierPickupInfoMapper courierPickupInfoMapper) {
        this.courierPickupInfoRepository = courierPickupInfoRepository;
        this.courierPickupInfoMapper = courierPickupInfoMapper;
    }

    /**
     * POST  /courier-pickup-infos : Create a new courierPickupInfo.
     *
     * @param courierPickupInfoDTO the courierPickupInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courierPickupInfoDTO, or with status 400 (Bad Request) if the courierPickupInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courier-pickup-infos")
    @Timed
    public ResponseEntity<CourierPickupInfoDTO> createCourierPickupInfo(@Valid @RequestBody CourierPickupInfoDTO courierPickupInfoDTO) throws URISyntaxException {
        log.debug("REST request to save CourierPickupInfo : {}", courierPickupInfoDTO);
        if (courierPickupInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new courierPickupInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        CourierPickupInfo courierPickupInfo = courierPickupInfoMapper.toEntity(courierPickupInfoDTO);
        courierPickupInfo = courierPickupInfoRepository.save(courierPickupInfo);
        CourierPickupInfoDTO result = courierPickupInfoMapper.toDto(courierPickupInfo);
        return ResponseEntity.created(new URI("/api/courier-pickup-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courier-pickup-infos : Updates an existing courierPickupInfo.
     *
     * @param courierPickupInfoDTO the courierPickupInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courierPickupInfoDTO,
     * or with status 400 (Bad Request) if the courierPickupInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the courierPickupInfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courier-pickup-infos")
    @Timed
    public ResponseEntity<CourierPickupInfoDTO> updateCourierPickupInfo(@Valid @RequestBody CourierPickupInfoDTO courierPickupInfoDTO) throws URISyntaxException {
        log.debug("REST request to update CourierPickupInfo : {}", courierPickupInfoDTO);
        if (courierPickupInfoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        CourierPickupInfo courierPickupInfo = courierPickupInfoMapper.toEntity(courierPickupInfoDTO);
        courierPickupInfo = courierPickupInfoRepository.save(courierPickupInfo);
        CourierPickupInfoDTO result = courierPickupInfoMapper.toDto(courierPickupInfo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courierPickupInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courier-pickup-infos : get all the courierPickupInfos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courierPickupInfos in body
     */
    @GetMapping("/courier-pickup-infos")
    @Timed
    public List<CourierPickupInfoDTO> getAllCourierPickupInfos() {
        log.debug("REST request to get all CourierPickupInfos");
        List<CourierPickupInfo> courierPickupInfos = courierPickupInfoRepository.findAll();
        return courierPickupInfoMapper.toDto(courierPickupInfos);
    }

    /**
     * GET  /courier-pickup-infos/:id : get the "id" courierPickupInfo.
     *
     * @param id the id of the courierPickupInfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courierPickupInfoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/courier-pickup-infos/{id}")
    @Timed
    public ResponseEntity<CourierPickupInfoDTO> getCourierPickupInfo(@PathVariable Long id) {
        log.debug("REST request to get CourierPickupInfo : {}", id);
        Optional<CourierPickupInfoDTO> courierPickupInfoDTO = courierPickupInfoRepository.findById(id)
            .map(courierPickupInfoMapper::toDto);
        return ResponseUtil.wrapOrNotFound(courierPickupInfoDTO);
    }

    /**
     * DELETE  /courier-pickup-infos/:id : delete the "id" courierPickupInfo.
     *
     * @param id the id of the courierPickupInfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courier-pickup-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourierPickupInfo(@PathVariable Long id) {
        log.debug("REST request to delete CourierPickupInfo : {}", id);
        courierPickupInfoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
