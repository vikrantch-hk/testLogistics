package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.ProductGroup;
import com.hk.test.repository.ProductGroupRepository;
import com.hk.test.service.dto.ProductGroupDTO;
import com.hk.test.service.mapper.ProductGroupMapper;
import com.hk.test.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
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
import java.util.List;
import java.util.ArrayList;

import static com.hk.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductGroupResource REST controller.
 *
 * @see ProductGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class ProductGroupResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProductGroupRepository productGroupRepository;


    @Autowired
    private ProductGroupMapper productGroupMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductGroupMockMvc;

    private ProductGroup productGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductGroupResource productGroupResource = new ProductGroupResource(productGroupRepository, productGroupMapper);
        this.restProductGroupMockMvc = MockMvcBuilders.standaloneSetup(productGroupResource)
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
    public static ProductGroup createEntity(EntityManager em) {
        ProductGroup productGroup = new ProductGroup()
            .name(DEFAULT_NAME);
        return productGroup;
    }

    @Before
    public void initTest() {
        productGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductGroup() throws Exception {
        int databaseSizeBeforeCreate = productGroupRepository.findAll().size();

        // Create the ProductGroup
        ProductGroupDTO productGroupDTO = productGroupMapper.toDto(productGroup);
        restProductGroupMockMvc.perform(post("/api/product-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productGroupDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductGroup in the database
        List<ProductGroup> productGroupList = productGroupRepository.findAll();
        assertThat(productGroupList).hasSize(databaseSizeBeforeCreate + 1);
        ProductGroup testProductGroup = productGroupList.get(productGroupList.size() - 1);
        assertThat(testProductGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProductGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productGroupRepository.findAll().size();

        // Create the ProductGroup with an existing ID
        productGroup.setId(1L);
        ProductGroupDTO productGroupDTO = productGroupMapper.toDto(productGroup);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductGroupMockMvc.perform(post("/api/product-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductGroup in the database
        List<ProductGroup> productGroupList = productGroupRepository.findAll();
        assertThat(productGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = productGroupRepository.findAll().size();
        // set the field null
        productGroup.setName(null);

        // Create the ProductGroup, which fails.
        ProductGroupDTO productGroupDTO = productGroupMapper.toDto(productGroup);

        restProductGroupMockMvc.perform(post("/api/product-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productGroupDTO)))
            .andExpect(status().isBadRequest());

        List<ProductGroup> productGroupList = productGroupRepository.findAll();
        assertThat(productGroupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductGroups() throws Exception {
        // Initialize the database
        productGroupRepository.saveAndFlush(productGroup);

        // Get all the productGroupList
        restProductGroupMockMvc.perform(get("/api/product-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getProductGroup() throws Exception {
        // Initialize the database
        productGroupRepository.saveAndFlush(productGroup);

        // Get the productGroup
        restProductGroupMockMvc.perform(get("/api/product-groups/{id}", productGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProductGroup() throws Exception {
        // Get the productGroup
        restProductGroupMockMvc.perform(get("/api/product-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductGroup() throws Exception {
        // Initialize the database
        productGroupRepository.saveAndFlush(productGroup);

        int databaseSizeBeforeUpdate = productGroupRepository.findAll().size();

        // Update the productGroup
        ProductGroup updatedProductGroup = productGroupRepository.findById(productGroup.getId()).get();
        // Disconnect from session so that the updates on updatedProductGroup are not directly saved in db
        em.detach(updatedProductGroup);
        updatedProductGroup
            .name(UPDATED_NAME);
        ProductGroupDTO productGroupDTO = productGroupMapper.toDto(updatedProductGroup);

        restProductGroupMockMvc.perform(put("/api/product-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productGroupDTO)))
            .andExpect(status().isOk());

        // Validate the ProductGroup in the database
        List<ProductGroup> productGroupList = productGroupRepository.findAll();
        assertThat(productGroupList).hasSize(databaseSizeBeforeUpdate);
        ProductGroup testProductGroup = productGroupList.get(productGroupList.size() - 1);
        assertThat(testProductGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProductGroup() throws Exception {
        int databaseSizeBeforeUpdate = productGroupRepository.findAll().size();

        // Create the ProductGroup
        ProductGroupDTO productGroupDTO = productGroupMapper.toDto(productGroup);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductGroupMockMvc.perform(put("/api/product-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductGroup in the database
        List<ProductGroup> productGroupList = productGroupRepository.findAll();
        assertThat(productGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductGroup() throws Exception {
        // Initialize the database
        productGroupRepository.saveAndFlush(productGroup);

        int databaseSizeBeforeDelete = productGroupRepository.findAll().size();

        // Get the productGroup
        restProductGroupMockMvc.perform(delete("/api/product-groups/{id}", productGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductGroup> productGroupList = productGroupRepository.findAll();
        assertThat(productGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductGroup.class);
        ProductGroup productGroup1 = new ProductGroup();
        productGroup1.setId(1L);
        ProductGroup productGroup2 = new ProductGroup();
        productGroup2.setId(productGroup1.getId());
        assertThat(productGroup1).isEqualTo(productGroup2);
        productGroup2.setId(2L);
        assertThat(productGroup1).isNotEqualTo(productGroup2);
        productGroup1.setId(null);
        assertThat(productGroup1).isNotEqualTo(productGroup2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductGroupDTO.class);
        ProductGroupDTO productGroupDTO1 = new ProductGroupDTO();
        productGroupDTO1.setId(1L);
        ProductGroupDTO productGroupDTO2 = new ProductGroupDTO();
        assertThat(productGroupDTO1).isNotEqualTo(productGroupDTO2);
        productGroupDTO2.setId(productGroupDTO1.getId());
        assertThat(productGroupDTO1).isEqualTo(productGroupDTO2);
        productGroupDTO2.setId(2L);
        assertThat(productGroupDTO1).isNotEqualTo(productGroupDTO2);
        productGroupDTO1.setId(null);
        assertThat(productGroupDTO1).isNotEqualTo(productGroupDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productGroupMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productGroupMapper.fromId(null)).isNull();
    }
}
