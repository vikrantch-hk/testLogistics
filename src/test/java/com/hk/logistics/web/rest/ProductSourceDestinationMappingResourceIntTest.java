package com.hk.logistics.web.rest;

import com.hk.logistics.TestLogisticsApp;

import com.hk.logistics.domain.ProductSourceDestinationMapping;
import com.hk.logistics.repository.ProductSourceDestinationMappingRepository;
import com.hk.logistics.repository.search.ProductSourceDestinationMappingSearchRepository;
import com.hk.logistics.service.ProductSourceDestinationMappingService;
import com.hk.logistics.service.dto.ProductSourceDestinationMappingDTO;
import com.hk.logistics.service.mapper.ProductSourceDestinationMappingMapper;
import com.hk.logistics.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;


import static com.hk.logistics.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductSourceDestinationMappingResource REST controller.
 *
 * @see ProductSourceDestinationMappingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class ProductSourceDestinationMappingResourceIntTest {

    @Autowired
    private ProductSourceDestinationMappingRepository productSourceDestinationMappingRepository;


    @Autowired
    private ProductSourceDestinationMappingMapper productSourceDestinationMappingMapper;
    

    @Autowired
    private ProductSourceDestinationMappingService productSourceDestinationMappingService;

    /**
     * This repository is mocked in the com.hk.logistics.repository.search test package.
     *
     * @see com.hk.logistics.repository.search.ProductSourceDestinationMappingSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductSourceDestinationMappingSearchRepository mockProductSourceDestinationMappingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductSourceDestinationMappingMockMvc;

    private ProductSourceDestinationMapping productSourceDestinationMapping;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductSourceDestinationMappingResource productSourceDestinationMappingResource = new ProductSourceDestinationMappingResource(productSourceDestinationMappingService);
        this.restProductSourceDestinationMappingMockMvc = MockMvcBuilders.standaloneSetup(productSourceDestinationMappingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductSourceDestinationMapping createEntity(EntityManager em) {
        ProductSourceDestinationMapping productSourceDestinationMapping = new ProductSourceDestinationMapping();
        return productSourceDestinationMapping;
    }

    @Before
    public void initTest() {
        productSourceDestinationMapping = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductSourceDestinationMapping() throws Exception {
        int databaseSizeBeforeCreate = productSourceDestinationMappingRepository.findAll().size();

        // Create the ProductSourceDestinationMapping
        ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO = productSourceDestinationMappingMapper.toDto(productSourceDestinationMapping);
        restProductSourceDestinationMappingMockMvc.perform(post("/api/product-source-destination-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSourceDestinationMappingDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductSourceDestinationMapping in the database
        List<ProductSourceDestinationMapping> productSourceDestinationMappingList = productSourceDestinationMappingRepository.findAll();
        assertThat(productSourceDestinationMappingList).hasSize(databaseSizeBeforeCreate + 1);
        ProductSourceDestinationMapping testProductSourceDestinationMapping = productSourceDestinationMappingList.get(productSourceDestinationMappingList.size() - 1);

        // Validate the ProductSourceDestinationMapping in Elasticsearch
        verify(mockProductSourceDestinationMappingSearchRepository, times(1)).save(testProductSourceDestinationMapping);
    }

    @Test
    @Transactional
    public void createProductSourceDestinationMappingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productSourceDestinationMappingRepository.findAll().size();

        // Create the ProductSourceDestinationMapping with an existing ID
        productSourceDestinationMapping.setId(1L);
        ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO = productSourceDestinationMappingMapper.toDto(productSourceDestinationMapping);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductSourceDestinationMappingMockMvc.perform(post("/api/product-source-destination-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSourceDestinationMappingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductSourceDestinationMapping in the database
        List<ProductSourceDestinationMapping> productSourceDestinationMappingList = productSourceDestinationMappingRepository.findAll();
        assertThat(productSourceDestinationMappingList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductSourceDestinationMapping in Elasticsearch
        verify(mockProductSourceDestinationMappingSearchRepository, times(0)).save(productSourceDestinationMapping);
    }

    @Test
    @Transactional
    public void getAllProductSourceDestinationMappings() throws Exception {
        // Initialize the database
        productSourceDestinationMappingRepository.saveAndFlush(productSourceDestinationMapping);

        // Get all the productSourceDestinationMappingList
        restProductSourceDestinationMappingMockMvc.perform(get("/api/product-source-destination-mappings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productSourceDestinationMapping.getId().intValue())));
    }
    

    @Test
    @Transactional
    public void getProductSourceDestinationMapping() throws Exception {
        // Initialize the database
        productSourceDestinationMappingRepository.saveAndFlush(productSourceDestinationMapping);

        // Get the productSourceDestinationMapping
        restProductSourceDestinationMappingMockMvc.perform(get("/api/product-source-destination-mappings/{id}", productSourceDestinationMapping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productSourceDestinationMapping.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProductSourceDestinationMapping() throws Exception {
        // Get the productSourceDestinationMapping
        restProductSourceDestinationMappingMockMvc.perform(get("/api/product-source-destination-mappings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductSourceDestinationMapping() throws Exception {
        // Initialize the database
        productSourceDestinationMappingRepository.saveAndFlush(productSourceDestinationMapping);

        int databaseSizeBeforeUpdate = productSourceDestinationMappingRepository.findAll().size();

        // Update the productSourceDestinationMapping
        ProductSourceDestinationMapping updatedProductSourceDestinationMapping = productSourceDestinationMappingRepository.findById(productSourceDestinationMapping.getId()).get();
        // Disconnect from session so that the updates on updatedProductSourceDestinationMapping are not directly saved in db
        em.detach(updatedProductSourceDestinationMapping);
        ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO = productSourceDestinationMappingMapper.toDto(updatedProductSourceDestinationMapping);

        restProductSourceDestinationMappingMockMvc.perform(put("/api/product-source-destination-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSourceDestinationMappingDTO)))
            .andExpect(status().isOk());

        // Validate the ProductSourceDestinationMapping in the database
        List<ProductSourceDestinationMapping> productSourceDestinationMappingList = productSourceDestinationMappingRepository.findAll();
        assertThat(productSourceDestinationMappingList).hasSize(databaseSizeBeforeUpdate);
        ProductSourceDestinationMapping testProductSourceDestinationMapping = productSourceDestinationMappingList.get(productSourceDestinationMappingList.size() - 1);

        // Validate the ProductSourceDestinationMapping in Elasticsearch
        verify(mockProductSourceDestinationMappingSearchRepository, times(1)).save(testProductSourceDestinationMapping);
    }

    @Test
    @Transactional
    public void updateNonExistingProductSourceDestinationMapping() throws Exception {
        int databaseSizeBeforeUpdate = productSourceDestinationMappingRepository.findAll().size();

        // Create the ProductSourceDestinationMapping
        ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO = productSourceDestinationMappingMapper.toDto(productSourceDestinationMapping);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductSourceDestinationMappingMockMvc.perform(put("/api/product-source-destination-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productSourceDestinationMappingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductSourceDestinationMapping in the database
        List<ProductSourceDestinationMapping> productSourceDestinationMappingList = productSourceDestinationMappingRepository.findAll();
        assertThat(productSourceDestinationMappingList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductSourceDestinationMapping in Elasticsearch
        verify(mockProductSourceDestinationMappingSearchRepository, times(0)).save(productSourceDestinationMapping);
    }

    @Test
    @Transactional
    public void deleteProductSourceDestinationMapping() throws Exception {
        // Initialize the database
        productSourceDestinationMappingRepository.saveAndFlush(productSourceDestinationMapping);

        int databaseSizeBeforeDelete = productSourceDestinationMappingRepository.findAll().size();

        // Get the productSourceDestinationMapping
        restProductSourceDestinationMappingMockMvc.perform(delete("/api/product-source-destination-mappings/{id}", productSourceDestinationMapping.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductSourceDestinationMapping> productSourceDestinationMappingList = productSourceDestinationMappingRepository.findAll();
        assertThat(productSourceDestinationMappingList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductSourceDestinationMapping in Elasticsearch
        verify(mockProductSourceDestinationMappingSearchRepository, times(1)).deleteById(productSourceDestinationMapping.getId());
    }

    @Test
    @Transactional
    public void searchProductSourceDestinationMapping() throws Exception {
        // Initialize the database
        productSourceDestinationMappingRepository.saveAndFlush(productSourceDestinationMapping);
        when(mockProductSourceDestinationMappingSearchRepository.search(queryStringQuery("id:" + productSourceDestinationMapping.getId())))
            .thenReturn(Collections.singletonList(productSourceDestinationMapping));
        // Search the productSourceDestinationMapping
        restProductSourceDestinationMappingMockMvc.perform(get("/api/_search/product-source-destination-mappings?query=id:" + productSourceDestinationMapping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productSourceDestinationMapping.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductSourceDestinationMapping.class);
        ProductSourceDestinationMapping productSourceDestinationMapping1 = new ProductSourceDestinationMapping();
        productSourceDestinationMapping1.setId(1L);
        ProductSourceDestinationMapping productSourceDestinationMapping2 = new ProductSourceDestinationMapping();
        productSourceDestinationMapping2.setId(productSourceDestinationMapping1.getId());
        assertThat(productSourceDestinationMapping1).isEqualTo(productSourceDestinationMapping2);
        productSourceDestinationMapping2.setId(2L);
        assertThat(productSourceDestinationMapping1).isNotEqualTo(productSourceDestinationMapping2);
        productSourceDestinationMapping1.setId(null);
        assertThat(productSourceDestinationMapping1).isNotEqualTo(productSourceDestinationMapping2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductSourceDestinationMappingDTO.class);
        ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO1 = new ProductSourceDestinationMappingDTO();
        productSourceDestinationMappingDTO1.setId(1L);
        ProductSourceDestinationMappingDTO productSourceDestinationMappingDTO2 = new ProductSourceDestinationMappingDTO();
        assertThat(productSourceDestinationMappingDTO1).isNotEqualTo(productSourceDestinationMappingDTO2);
        productSourceDestinationMappingDTO2.setId(productSourceDestinationMappingDTO1.getId());
        assertThat(productSourceDestinationMappingDTO1).isEqualTo(productSourceDestinationMappingDTO2);
        productSourceDestinationMappingDTO2.setId(2L);
        assertThat(productSourceDestinationMappingDTO1).isNotEqualTo(productSourceDestinationMappingDTO2);
        productSourceDestinationMappingDTO1.setId(null);
        assertThat(productSourceDestinationMappingDTO1).isNotEqualTo(productSourceDestinationMappingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productSourceDestinationMappingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productSourceDestinationMappingMapper.fromId(null)).isNull();
    }
}
