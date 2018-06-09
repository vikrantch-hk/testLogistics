package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.domain.ProductSourceDestinationMapping;
import com.hk.logistics.repository.ProductSourceDestinationMappingRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.hk.logistics.service.dto.ProductSourceDestinationMappingDTO;
import com.hk.logistics.service.mapper.ProductSourceDestinationMappingMapper;
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
 * REST controller for managing ProductSourceDestinationMapping.
 */
@RestController
@RequestMapping("/api")
public class ProductSourceDestinationMappingResource {

    private final Logger log = LoggerFactory.getLogger(ProductSourceDestinationMappingResource.class);

    private static final String ENTITY_NAME = "productSourceDestinationMapping";

    private final ProductSourceDestinationMappingRepository productSourceDestinationMappingRepository;

    private final ProductSourceDestinationMappingMapper productSourceDestinationMappingMapper;

    public ProductSourceDestinationMappingResource(ProductSourceDestinationMappingRepository productSourceDestinationMappingRepository, ProductSourceDestinationMappingMapper productSourceDestinationMappingMapper) {
        this.productSourceDestinationMappingRepository = productSourceDestinationMappingRepository;
        this.productSourceDestinationMappingMapper = productSourceDestinationMappingMapper;
    }

    /**
     * POST  /product-source-destination-mappings : Create a new productSourceDestinationMapping.
     *
     * @param productSourceDestinationMappingDTO the productSourceDestinationMappingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productSourceDestinationMappingDTO, or with status 400 (Bad Request) if the productSourceDestinationMapping has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-source-destination-mappings")
    @Timed
    public ResponseEntity<ProductSourceDestinationMappingDTO> createProductSourceDestinationMapping(@RequestBody ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO) throws URISyntaxException {
        log.debug("REST request to save ProductSourceDestinationMapping : {}", productSourceDestinationMappingDTO);
        if (productSourceDestinationMappingDTO.getId() != null) {
            throw new BadRequestAlertException("A new productSourceDestinationMapping cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        ProductSourceDestinationMapping productSourceDestinationMapping = productSourceDestinationMappingMapper.toEntity(productSourceDestinationMappingDTO);
        productSourceDestinationMapping = productSourceDestinationMappingRepository.save(productSourceDestinationMapping);
        ProductSourceDestinationMappingDTO result = productSourceDestinationMappingMapper.toDto(productSourceDestinationMapping);
        return ResponseEntity.created(new URI("/api/product-source-destination-mappings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-source-destination-mappings : Updates an existing productSourceDestinationMapping.
     *
     * @param productSourceDestinationMappingDTO the productSourceDestinationMappingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productSourceDestinationMappingDTO,
     * or with status 400 (Bad Request) if the productSourceDestinationMappingDTO is not valid,
     * or with status 500 (Internal Server Error) if the productSourceDestinationMappingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-source-destination-mappings")
    @Timed
    public ResponseEntity<ProductSourceDestinationMappingDTO> updateProductSourceDestinationMapping(@RequestBody ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO) throws URISyntaxException {
        log.debug("REST request to update ProductSourceDestinationMapping : {}", productSourceDestinationMappingDTO);
        if (productSourceDestinationMappingDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        ProductSourceDestinationMapping productSourceDestinationMapping = productSourceDestinationMappingMapper.toEntity(productSourceDestinationMappingDTO);
        productSourceDestinationMapping = productSourceDestinationMappingRepository.save(productSourceDestinationMapping);
        ProductSourceDestinationMappingDTO result = productSourceDestinationMappingMapper.toDto(productSourceDestinationMapping);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productSourceDestinationMappingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-source-destination-mappings : get all the productSourceDestinationMappings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productSourceDestinationMappings in body
     */
    @GetMapping("/product-source-destination-mappings")
    @Timed
    public List<ProductSourceDestinationMappingDTO> getAllProductSourceDestinationMappings() {
        log.debug("REST request to get all ProductSourceDestinationMappings");
        List<ProductSourceDestinationMapping> productSourceDestinationMappings = productSourceDestinationMappingRepository.findAll();
        return productSourceDestinationMappingMapper.toDto(productSourceDestinationMappings);
    }

    /**
     * GET  /product-source-destination-mappings/:id : get the "id" productSourceDestinationMapping.
     *
     * @param id the id of the productSourceDestinationMappingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productSourceDestinationMappingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-source-destination-mappings/{id}")
    @Timed
    public ResponseEntity<ProductSourceDestinationMappingDTO> getProductSourceDestinationMapping(@PathVariable Long id) {
        log.debug("REST request to get ProductSourceDestinationMapping : {}", id);
        Optional<ProductSourceDestinationMappingDTO> productSourceDestinationMappingDTO = productSourceDestinationMappingRepository.findById(id)
            .map(productSourceDestinationMappingMapper::toDto);
        return ResponseUtil.wrapOrNotFound(productSourceDestinationMappingDTO);
    }

    /**
     * DELETE  /product-source-destination-mappings/:id : delete the "id" productSourceDestinationMapping.
     *
     * @param id the id of the productSourceDestinationMappingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-source-destination-mappings/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductSourceDestinationMapping(@PathVariable Long id) {
        log.debug("REST request to delete ProductSourceDestinationMapping : {}", id);
        productSourceDestinationMappingRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
