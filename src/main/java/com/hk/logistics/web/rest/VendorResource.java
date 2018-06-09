package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.repository.VendorRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.VendorDTO;
import com.hk.logistics.service.mapper.VendorMapper;
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
 * REST controller for managing Vendor.
 */
@RestController
@RequestMapping("/api")
public class VendorResource {

    private final Logger log = LoggerFactory.getLogger(VendorResource.class);

    private static final String ENTITY_NAME = "vendor";

    private final VendorRepository vendorRepository;

    private final VendorMapper vendorMapper;

    public VendorResource(VendorRepository vendorRepository, VendorMapper vendorMapper) {
        this.vendorRepository = vendorRepository;
        this.vendorMapper = vendorMapper;
    }

    /**
     * POST  /vendors : Create a new vendor.
     *
     * @param vendorDTO the vendorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vendorDTO, or with status 400 (Bad Request) if the vendor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendors")
    @Timed
    public ResponseEntity<VendorDTO> createVendor(@Valid @RequestBody VendorDTO vendorDTO) throws URISyntaxException {
        log.debug("REST request to save Vendor : {}", vendorDTO);
        if (vendorDTO.getId() != null) {
            throw new BadRequestAlertException("A new vendor cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Vendor vendor = vendorMapper.toEntity(vendorDTO);
        vendor = vendorRepository.save(vendor);
        VendorDTO result = vendorMapper.toDto(vendor);
        return ResponseEntity.created(new URI("/api/vendors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendors : Updates an existing vendor.
     *
     * @param vendorDTO the vendorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vendorDTO,
     * or with status 400 (Bad Request) if the vendorDTO is not valid,
     * or with status 500 (Internal Server Error) if the vendorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendors")
    @Timed
    public ResponseEntity<VendorDTO> updateVendor(@Valid @RequestBody VendorDTO vendorDTO) throws URISyntaxException {
        log.debug("REST request to update Vendor : {}", vendorDTO);
        if (vendorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Vendor vendor = vendorMapper.toEntity(vendorDTO);
        vendor = vendorRepository.save(vendor);
        VendorDTO result = vendorMapper.toDto(vendor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vendorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendors : get all the vendors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vendors in body
     */
    @GetMapping("/vendors")
    @Timed
    public List<VendorDTO> getAllVendors() {
        log.debug("REST request to get all Vendors");
        List<Vendor> vendors = vendorRepository.findAll();
        return vendorMapper.toDto(vendors);
    }

    /**
     * GET  /vendors/:id : get the "id" vendor.
     *
     * @param id the id of the vendorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vendorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/vendors/{id}")
    @Timed
    public ResponseEntity<VendorDTO> getVendor(@PathVariable Long id) {
        log.debug("REST request to get Vendor : {}", id);
        Optional<VendorDTO> vendorDTO = vendorRepository.findById(id)
            .map(vendorMapper::toDto);
        return ResponseUtil.wrapOrNotFound(vendorDTO);
    }

    /**
     * DELETE  /vendors/:id : delete the "id" vendor.
     *
     * @param id the id of the vendorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendors/{id}")
    @Timed
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        log.debug("REST request to delete Vendor : {}", id);
        vendorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
