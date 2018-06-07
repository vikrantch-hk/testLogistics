package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.Courier;
import com.hk.test.repository.CourierRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.web.rest.util.PaginationUtil;
import com.hk.test.service.dto.CourierDTO;
import com.hk.test.service.mapper.CourierMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Courier.
 */
@RestController
@RequestMapping("/api")
public class CourierResource {

    private final Logger log = LoggerFactory.getLogger(CourierResource.class);

    private static final String ENTITY_NAME = "courier";

    private final CourierRepository courierRepository;

    private final CourierMapper courierMapper;

    public CourierResource(CourierRepository courierRepository, CourierMapper courierMapper) {
        this.courierRepository = courierRepository;
        this.courierMapper = courierMapper;
    }

    /**
     * POST  /couriers : Create a new courier.
     *
     * @param courierDTO the courierDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courierDTO, or with status 400 (Bad Request) if the courier has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/couriers")
    @Timed
    public ResponseEntity<CourierDTO> createCourier(@Valid @RequestBody CourierDTO courierDTO) throws URISyntaxException {
        log.debug("REST request to save Courier : {}", courierDTO);
        if (courierDTO.getId() != null) {
            throw new BadRequestAlertException("A new courier cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Courier courier = courierMapper.toEntity(courierDTO);
        courier = courierRepository.save(courier);
        CourierDTO result = courierMapper.toDto(courier);
        return ResponseEntity.created(new URI("/api/couriers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /couriers : Updates an existing courier.
     *
     * @param courierDTO the courierDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courierDTO,
     * or with status 400 (Bad Request) if the courierDTO is not valid,
     * or with status 500 (Internal Server Error) if the courierDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/couriers")
    @Timed
    public ResponseEntity<CourierDTO> updateCourier(@Valid @RequestBody CourierDTO courierDTO) throws URISyntaxException {
        log.debug("REST request to update Courier : {}", courierDTO);
        if (courierDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Courier courier = courierMapper.toEntity(courierDTO);
        courier = courierRepository.save(courier);
        CourierDTO result = courierMapper.toDto(courier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courierDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /couriers : get all the couriers.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of couriers in body
     */
    @GetMapping("/couriers")
    @Timed
    public ResponseEntity<List<CourierDTO>> getAllCouriers(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Couriers");
        Page<CourierDTO> page;
        if (eagerload) {
            page = courierRepository.findAllWithEagerRelationships(pageable).map(courierMapper::toDto);
        } else {
            page = courierRepository.findAll(pageable).map(courierMapper::toDto);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/couriers?eagerload=%b", eagerload));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /couriers/:id : get the "id" courier.
     *
     * @param id the id of the courierDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courierDTO, or with status 404 (Not Found)
     */
    @GetMapping("/couriers/{id}")
    @Timed
    public ResponseEntity<CourierDTO> getCourier(@PathVariable Long id) {
        log.debug("REST request to get Courier : {}", id);
        Optional<CourierDTO> courierDTO = courierRepository.findOneWithEagerRelationships(id)
            .map(courierMapper::toDto);
        return ResponseUtil.wrapOrNotFound(courierDTO);
    }

    /**
     * DELETE  /couriers/:id : delete the "id" courier.
     *
     * @param id the id of the courierDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/couriers/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourier(@PathVariable Long id) {
        log.debug("REST request to delete Courier : {}", id);
        courierRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
