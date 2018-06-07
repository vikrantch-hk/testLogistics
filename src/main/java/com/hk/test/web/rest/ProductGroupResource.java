package com.hk.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.test.domain.ProductGroup;
import com.hk.test.repository.ProductGroupRepository;
import com.hk.test.web.rest.errors.BadRequestAlertException;
import com.hk.test.web.rest.util.HeaderUtil;
import com.hk.test.service.dto.ProductGroupDTO;
import com.hk.test.service.mapper.ProductGroupMapper;
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
 * REST controller for managing ProductGroup.
 */
@RestController
@RequestMapping("/api")
public class ProductGroupResource {

    private final Logger log = LoggerFactory.getLogger(ProductGroupResource.class);

    private static final String ENTITY_NAME = "productGroup";

    private final ProductGroupRepository productGroupRepository;

    private final ProductGroupMapper productGroupMapper;

    public ProductGroupResource(ProductGroupRepository productGroupRepository, ProductGroupMapper productGroupMapper) {
        this.productGroupRepository = productGroupRepository;
        this.productGroupMapper = productGroupMapper;
    }

    /**
     * POST  /product-groups : Create a new productGroup.
     *
     * @param productGroupDTO the productGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productGroupDTO, or with status 400 (Bad Request) if the productGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-groups")
    @Timed
    public ResponseEntity<ProductGroupDTO> createProductGroup(@Valid @RequestBody ProductGroupDTO productGroupDTO) throws URISyntaxException {
        log.debug("REST request to save ProductGroup : {}", productGroupDTO);
        if (productGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new productGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        ProductGroup productGroup = productGroupMapper.toEntity(productGroupDTO);
        productGroup = productGroupRepository.save(productGroup);
        ProductGroupDTO result = productGroupMapper.toDto(productGroup);
        return ResponseEntity.created(new URI("/api/product-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-groups : Updates an existing productGroup.
     *
     * @param productGroupDTO the productGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productGroupDTO,
     * or with status 400 (Bad Request) if the productGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the productGroupDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-groups")
    @Timed
    public ResponseEntity<ProductGroupDTO> updateProductGroup(@Valid @RequestBody ProductGroupDTO productGroupDTO) throws URISyntaxException {
        log.debug("REST request to update ProductGroup : {}", productGroupDTO);
        if (productGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        ProductGroup productGroup = productGroupMapper.toEntity(productGroupDTO);
        productGroup = productGroupRepository.save(productGroup);
        ProductGroupDTO result = productGroupMapper.toDto(productGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-groups : get all the productGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productGroups in body
     */
    @GetMapping("/product-groups")
    @Timed
    public List<ProductGroupDTO> getAllProductGroups() {
        log.debug("REST request to get all ProductGroups");
        List<ProductGroup> productGroups = productGroupRepository.findAll();
        return productGroupMapper.toDto(productGroups);
    }

    /**
     * GET  /product-groups/:id : get the "id" productGroup.
     *
     * @param id the id of the productGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-groups/{id}")
    @Timed
    public ResponseEntity<ProductGroupDTO> getProductGroup(@PathVariable Long id) {
        log.debug("REST request to get ProductGroup : {}", id);
        Optional<ProductGroupDTO> productGroupDTO = productGroupRepository.findById(id)
            .map(productGroupMapper::toDto);
        return ResponseUtil.wrapOrNotFound(productGroupDTO);
    }

    /**
     * DELETE  /product-groups/:id : delete the "id" productGroup.
     *
     * @param id the id of the productGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductGroup(@PathVariable Long id) {
        log.debug("REST request to delete ProductGroup : {}", id);
        productGroupRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
