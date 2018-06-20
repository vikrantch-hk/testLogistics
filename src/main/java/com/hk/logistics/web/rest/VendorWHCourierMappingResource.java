package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.service.VendorWHCourierMappingService;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.VendorWHCourierMappingDTO;
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
 * REST controller for managing VendorWHCourierMapping.
 */
@RestController
@RequestMapping("/api")
public class VendorWHCourierMappingResource {

    private final Logger log = LoggerFactory.getLogger(VendorWHCourierMappingResource.class);

    private static final String ENTITY_NAME = "vendorWHCourierMapping";

    private final VendorWHCourierMappingService vendorWHCourierMappingService;

    public VendorWHCourierMappingResource(VendorWHCourierMappingService vendorWHCourierMappingService) {
        this.vendorWHCourierMappingService = vendorWHCourierMappingService;
    }

    /**
     * POST  /vendor-wh-courier-mappings : Create a new vendorWHCourierMapping.
     *
     * @param vendorWHCourierMappingDTO the vendorWHCourierMappingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vendorWHCourierMappingDTO, or with status 400 (Bad Request) if the vendorWHCourierMapping has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendor-wh-courier-mappings")
    @Timed
    public ResponseEntity<VendorWHCourierMappingDTO> createVendorWHCourierMapping(@Valid @RequestBody VendorWHCourierMappingDTO vendorWHCourierMappingDTO) throws URISyntaxException {
        log.debug("REST request to save VendorWHCourierMapping : {}", vendorWHCourierMappingDTO);
        if (vendorWHCourierMappingDTO.getId() != null) {
            throw new BadRequestAlertException("A new vendorWHCourierMapping cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VendorWHCourierMappingDTO result = vendorWHCourierMappingService.save(vendorWHCourierMappingDTO);
        return ResponseEntity.created(new URI("/api/vendor-wh-courier-mappings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendor-wh-courier-mappings : Updates an existing vendorWHCourierMapping.
     *
     * @param vendorWHCourierMappingDTO the vendorWHCourierMappingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vendorWHCourierMappingDTO,
     * or with status 400 (Bad Request) if the vendorWHCourierMappingDTO is not valid,
     * or with status 500 (Internal Server Error) if the vendorWHCourierMappingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendor-wh-courier-mappings")
    @Timed
    public ResponseEntity<VendorWHCourierMappingDTO> updateVendorWHCourierMapping(@Valid @RequestBody VendorWHCourierMappingDTO vendorWHCourierMappingDTO) throws URISyntaxException {
        log.debug("REST request to update VendorWHCourierMapping : {}", vendorWHCourierMappingDTO);
        if (vendorWHCourierMappingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VendorWHCourierMappingDTO result = vendorWHCourierMappingService.save(vendorWHCourierMappingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vendorWHCourierMappingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendor-wh-courier-mappings : get all the vendorWHCourierMappings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vendorWHCourierMappings in body
     */
    @GetMapping("/vendor-wh-courier-mappings")
    @Timed
    public List<VendorWHCourierMappingDTO> getAllVendorWHCourierMappings() {
        log.debug("REST request to get all VendorWHCourierMappings");
        return vendorWHCourierMappingService.findAll();
    }

    /**
     * GET  /vendor-wh-courier-mappings/:id : get the "id" vendorWHCourierMapping.
     *
     * @param id the id of the vendorWHCourierMappingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vendorWHCourierMappingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/vendor-wh-courier-mappings/{id}")
    @Timed
    public ResponseEntity<VendorWHCourierMappingDTO> getVendorWHCourierMapping(@PathVariable Long id) {
        log.debug("REST request to get VendorWHCourierMapping : {}", id);
        Optional<VendorWHCourierMappingDTO> vendorWHCourierMappingDTO = vendorWHCourierMappingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vendorWHCourierMappingDTO);
    }

    /**
     * DELETE  /vendor-wh-courier-mappings/:id : delete the "id" vendorWHCourierMapping.
     *
     * @param id the id of the vendorWHCourierMappingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendor-wh-courier-mappings/{id}")
    @Timed
    public ResponseEntity<Void> deleteVendorWHCourierMapping(@PathVariable Long id) {
        log.debug("REST request to delete VendorWHCourierMapping : {}", id);
        vendorWHCourierMappingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/vendor-wh-courier-mappings?query=:query : search for the vendorWHCourierMapping corresponding
     * to the query.
     *
     * @param query the query of the vendorWHCourierMapping search
     * @return the result of the search
     */
    @GetMapping("/_search/vendor-wh-courier-mappings")
    @Timed
    public List<VendorWHCourierMappingDTO> searchVendorWHCourierMappings(@RequestParam String query) {
        log.debug("REST request to search VendorWHCourierMappings for query {}", query);
        return vendorWHCourierMappingService.search(query);
    }

}
