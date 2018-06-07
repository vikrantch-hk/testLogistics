package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.VendorWHCourierMapping;
import com.hk.test.repository.VendorWHCourierMappingRepository;
import com.hk.test.service.dto.VendorWHCourierMappingDTO;
import com.hk.test.service.mapper.VendorWHCourierMappingMapper;
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
 * Test class for the VendorWHCourierMappingResource REST controller.
 *
 * @see VendorWHCourierMappingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class VendorWHCourierMappingResourceIntTest {

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private VendorWHCourierMappingRepository vendorWHCourierMappingRepository;


    @Autowired
    private VendorWHCourierMappingMapper vendorWHCourierMappingMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVendorWHCourierMappingMockMvc;

    private VendorWHCourierMapping vendorWHCourierMapping;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendorWHCourierMappingResource vendorWHCourierMappingResource = new VendorWHCourierMappingResource(vendorWHCourierMappingRepository, vendorWHCourierMappingMapper);
        this.restVendorWHCourierMappingMockMvc = MockMvcBuilders.standaloneSetup(vendorWHCourierMappingResource)
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
    public static VendorWHCourierMapping createEntity(EntityManager em) {
        VendorWHCourierMapping vendorWHCourierMapping = new VendorWHCourierMapping()
            .active(DEFAULT_ACTIVE);
        return vendorWHCourierMapping;
    }

    @Before
    public void initTest() {
        vendorWHCourierMapping = createEntity(em);
    }

    @Test
    @Transactional
    public void createVendorWHCourierMapping() throws Exception {
        int databaseSizeBeforeCreate = vendorWHCourierMappingRepository.findAll().size();

        // Create the VendorWHCourierMapping
        VendorWHCourierMappingDTO vendorWHCourierMappingDTO = vendorWHCourierMappingMapper.toDto(vendorWHCourierMapping);
        restVendorWHCourierMappingMockMvc.perform(post("/api/vendor-wh-courier-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorWHCourierMappingDTO)))
            .andExpect(status().isCreated());

        // Validate the VendorWHCourierMapping in the database
        List<VendorWHCourierMapping> vendorWHCourierMappingList = vendorWHCourierMappingRepository.findAll();
        assertThat(vendorWHCourierMappingList).hasSize(databaseSizeBeforeCreate + 1);
        VendorWHCourierMapping testVendorWHCourierMapping = vendorWHCourierMappingList.get(vendorWHCourierMappingList.size() - 1);
        assertThat(testVendorWHCourierMapping.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createVendorWHCourierMappingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendorWHCourierMappingRepository.findAll().size();

        // Create the VendorWHCourierMapping with an existing ID
        vendorWHCourierMapping.setId(1L);
        VendorWHCourierMappingDTO vendorWHCourierMappingDTO = vendorWHCourierMappingMapper.toDto(vendorWHCourierMapping);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendorWHCourierMappingMockMvc.perform(post("/api/vendor-wh-courier-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorWHCourierMappingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the VendorWHCourierMapping in the database
        List<VendorWHCourierMapping> vendorWHCourierMappingList = vendorWHCourierMappingRepository.findAll();
        assertThat(vendorWHCourierMappingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorWHCourierMappingRepository.findAll().size();
        // set the field null
        vendorWHCourierMapping.setActive(null);

        // Create the VendorWHCourierMapping, which fails.
        VendorWHCourierMappingDTO vendorWHCourierMappingDTO = vendorWHCourierMappingMapper.toDto(vendorWHCourierMapping);

        restVendorWHCourierMappingMockMvc.perform(post("/api/vendor-wh-courier-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorWHCourierMappingDTO)))
            .andExpect(status().isBadRequest());

        List<VendorWHCourierMapping> vendorWHCourierMappingList = vendorWHCourierMappingRepository.findAll();
        assertThat(vendorWHCourierMappingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVendorWHCourierMappings() throws Exception {
        // Initialize the database
        vendorWHCourierMappingRepository.saveAndFlush(vendorWHCourierMapping);

        // Get all the vendorWHCourierMappingList
        restVendorWHCourierMappingMockMvc.perform(get("/api/vendor-wh-courier-mappings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendorWHCourierMapping.getId().intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getVendorWHCourierMapping() throws Exception {
        // Initialize the database
        vendorWHCourierMappingRepository.saveAndFlush(vendorWHCourierMapping);

        // Get the vendorWHCourierMapping
        restVendorWHCourierMappingMockMvc.perform(get("/api/vendor-wh-courier-mappings/{id}", vendorWHCourierMapping.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vendorWHCourierMapping.getId().intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingVendorWHCourierMapping() throws Exception {
        // Get the vendorWHCourierMapping
        restVendorWHCourierMappingMockMvc.perform(get("/api/vendor-wh-courier-mappings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVendorWHCourierMapping() throws Exception {
        // Initialize the database
        vendorWHCourierMappingRepository.saveAndFlush(vendorWHCourierMapping);

        int databaseSizeBeforeUpdate = vendorWHCourierMappingRepository.findAll().size();

        // Update the vendorWHCourierMapping
        VendorWHCourierMapping updatedVendorWHCourierMapping = vendorWHCourierMappingRepository.findById(vendorWHCourierMapping.getId()).get();
        // Disconnect from session so that the updates on updatedVendorWHCourierMapping are not directly saved in db
        em.detach(updatedVendorWHCourierMapping);
        updatedVendorWHCourierMapping
            .active(UPDATED_ACTIVE);
        VendorWHCourierMappingDTO vendorWHCourierMappingDTO = vendorWHCourierMappingMapper.toDto(updatedVendorWHCourierMapping);

        restVendorWHCourierMappingMockMvc.perform(put("/api/vendor-wh-courier-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorWHCourierMappingDTO)))
            .andExpect(status().isOk());

        // Validate the VendorWHCourierMapping in the database
        List<VendorWHCourierMapping> vendorWHCourierMappingList = vendorWHCourierMappingRepository.findAll();
        assertThat(vendorWHCourierMappingList).hasSize(databaseSizeBeforeUpdate);
        VendorWHCourierMapping testVendorWHCourierMapping = vendorWHCourierMappingList.get(vendorWHCourierMappingList.size() - 1);
        assertThat(testVendorWHCourierMapping.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingVendorWHCourierMapping() throws Exception {
        int databaseSizeBeforeUpdate = vendorWHCourierMappingRepository.findAll().size();

        // Create the VendorWHCourierMapping
        VendorWHCourierMappingDTO vendorWHCourierMappingDTO = vendorWHCourierMappingMapper.toDto(vendorWHCourierMapping);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVendorWHCourierMappingMockMvc.perform(put("/api/vendor-wh-courier-mappings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorWHCourierMappingDTO)))
            .andExpect(status().isBadRequest());

        // Validate the VendorWHCourierMapping in the database
        List<VendorWHCourierMapping> vendorWHCourierMappingList = vendorWHCourierMappingRepository.findAll();
        assertThat(vendorWHCourierMappingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVendorWHCourierMapping() throws Exception {
        // Initialize the database
        vendorWHCourierMappingRepository.saveAndFlush(vendorWHCourierMapping);

        int databaseSizeBeforeDelete = vendorWHCourierMappingRepository.findAll().size();

        // Get the vendorWHCourierMapping
        restVendorWHCourierMappingMockMvc.perform(delete("/api/vendor-wh-courier-mappings/{id}", vendorWHCourierMapping.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<VendorWHCourierMapping> vendorWHCourierMappingList = vendorWHCourierMappingRepository.findAll();
        assertThat(vendorWHCourierMappingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VendorWHCourierMapping.class);
        VendorWHCourierMapping vendorWHCourierMapping1 = new VendorWHCourierMapping();
        vendorWHCourierMapping1.setId(1L);
        VendorWHCourierMapping vendorWHCourierMapping2 = new VendorWHCourierMapping();
        vendorWHCourierMapping2.setId(vendorWHCourierMapping1.getId());
        assertThat(vendorWHCourierMapping1).isEqualTo(vendorWHCourierMapping2);
        vendorWHCourierMapping2.setId(2L);
        assertThat(vendorWHCourierMapping1).isNotEqualTo(vendorWHCourierMapping2);
        vendorWHCourierMapping1.setId(null);
        assertThat(vendorWHCourierMapping1).isNotEqualTo(vendorWHCourierMapping2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VendorWHCourierMappingDTO.class);
        VendorWHCourierMappingDTO vendorWHCourierMappingDTO1 = new VendorWHCourierMappingDTO();
        vendorWHCourierMappingDTO1.setId(1L);
        VendorWHCourierMappingDTO vendorWHCourierMappingDTO2 = new VendorWHCourierMappingDTO();
        assertThat(vendorWHCourierMappingDTO1).isNotEqualTo(vendorWHCourierMappingDTO2);
        vendorWHCourierMappingDTO2.setId(vendorWHCourierMappingDTO1.getId());
        assertThat(vendorWHCourierMappingDTO1).isEqualTo(vendorWHCourierMappingDTO2);
        vendorWHCourierMappingDTO2.setId(2L);
        assertThat(vendorWHCourierMappingDTO1).isNotEqualTo(vendorWHCourierMappingDTO2);
        vendorWHCourierMappingDTO1.setId(null);
        assertThat(vendorWHCourierMappingDTO1).isNotEqualTo(vendorWHCourierMappingDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(vendorWHCourierMappingMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(vendorWHCourierMappingMapper.fromId(null)).isNull();
    }
}
