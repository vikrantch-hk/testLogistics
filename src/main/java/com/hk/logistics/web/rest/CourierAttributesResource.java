package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.service.CourierAttributesService;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.CourierAttributesDTO;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing CourierAttributes.
 */
@RestController
@RequestMapping("/api")
public class CourierAttributesResource {

    private final Logger log = LoggerFactory.getLogger(CourierAttributesResource.class);

    private static final String ENTITY_NAME = "courierAttributes";

    private final CourierAttributesService courierAttributesService;

    public CourierAttributesResource(CourierAttributesService courierAttributesService) {
        this.courierAttributesService = courierAttributesService;
    }

    /**
     * POST  /courier-attributes : Create a new courierAttributes.
     *
     * @param courierAttributesDTO the courierAttributesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courierAttributesDTO, or with status 400 (Bad Request) if the courierAttributes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courier-attributes")
    @Timed
    public ResponseEntity<CourierAttributesDTO> createCourierAttributes(@Valid @RequestBody CourierAttributesDTO courierAttributesDTO) throws URISyntaxException {
        log.debug("REST request to save CourierAttributes : {}", courierAttributesDTO);
        if (courierAttributesDTO.getId() != null) {
            throw new BadRequestAlertException("A new courierAttributes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CourierAttributesDTO result = courierAttributesService.save(courierAttributesDTO);
        return ResponseEntity.created(new URI("/api/courier-attributes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courier-attributes : Updates an existing courierAttributes.
     *
     * @param courierAttributesDTO the courierAttributesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courierAttributesDTO,
     * or with status 400 (Bad Request) if the courierAttributesDTO is not valid,
     * or with status 500 (Internal Server Error) if the courierAttributesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courier-attributes")
    @Timed
    public ResponseEntity<CourierAttributesDTO> updateCourierAttributes(@Valid @RequestBody CourierAttributesDTO courierAttributesDTO) throws URISyntaxException {
        log.debug("REST request to update CourierAttributes : {}", courierAttributesDTO);
        if (courierAttributesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CourierAttributesDTO result = courierAttributesService.save(courierAttributesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courierAttributesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courier-attributes : get all the courierAttributes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courierAttributes in body
     */
    @GetMapping("/courier-attributes")
    @Timed
    public List<CourierAttributesDTO> getAllCourierAttributes() {
        log.debug("REST request to get all CourierAttributes");
        return courierAttributesService.findAll();
    }

    /**
     * GET  /courier-attributes/:id : get the "id" courierAttributes.
     *
     * @param id the id of the courierAttributesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courierAttributesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/courier-attributes/{id}")
    @Timed
    public ResponseEntity<CourierAttributesDTO> getCourierAttributes(@PathVariable Long id) {
        log.debug("REST request to get CourierAttributes : {}", id);
        Optional<CourierAttributesDTO> courierAttributesDTO = courierAttributesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(courierAttributesDTO);
    }

    /**
     * DELETE  /courier-attributes/:id : delete the "id" courierAttributes.
     *
     * @param id the id of the courierAttributesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courier-attributes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCourierAttributes(@PathVariable Long id) {
        log.debug("REST request to delete CourierAttributes : {}", id);
        courierAttributesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/courier-attributes?query=:query : search for the courierAttributes corresponding
     * to the query.
     *
     * @param query the query of the courierAttributes search
     * @return the result of the search
     */
    @GetMapping("/_search/courier-attributes")
    @Timed
    public List<CourierAttributesDTO> searchCourierAttributes(@RequestParam String query) {
        log.debug("REST request to search CourierAttributes for query {}", query);
        return courierAttributesService.search(query);
    }

}
