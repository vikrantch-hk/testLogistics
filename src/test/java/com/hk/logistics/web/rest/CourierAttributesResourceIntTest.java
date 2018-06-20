package com.hk.logistics.web.rest;

import com.hk.logistics.TestLogisticsApp;

import com.hk.logistics.domain.CourierAttributes;
import com.hk.logistics.repository.CourierAttributesRepository;
import com.hk.logistics.repository.search.CourierAttributesSearchRepository;
import com.hk.logistics.service.CourierAttributesService;
import com.hk.logistics.service.dto.CourierAttributesDTO;
import com.hk.logistics.service.mapper.CourierAttributesMapper;
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
 * Test class for the CourierAttributesResource REST controller.
 *
 * @see CourierAttributesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class CourierAttributesResourceIntTest {

    private static final Boolean DEFAULT_PREPAID_AIR = false;
    private static final Boolean UPDATED_PREPAID_AIR = true;

    private static final Boolean DEFAULT_PREPAID_GROUND = false;
    private static final Boolean UPDATED_PREPAID_GROUND = true;

    private static final Boolean DEFAULT_COD_AIR = false;
    private static final Boolean UPDATED_COD_AIR = true;

    private static final Boolean DEFAULT_COD_GROUND = false;
    private static final Boolean UPDATED_COD_GROUND = true;

    private static final Boolean DEFAULT_REVERSE_AIR = false;
    private static final Boolean UPDATED_REVERSE_AIR = true;

    private static final Boolean DEFAULT_REVERSE_GROUND = false;
    private static final Boolean UPDATED_REVERSE_GROUND = true;

    private static final Boolean DEFAULT_CARD_ON_DELIVERY_AIR = false;
    private static final Boolean UPDATED_CARD_ON_DELIVERY_AIR = true;

    private static final Boolean DEFAULT_CARD_ON_DELIVERY_GROUND = false;
    private static final Boolean UPDATED_CARD_ON_DELIVERY_GROUND = true;

    @Autowired
    private CourierAttributesRepository courierAttributesRepository;


    @Autowired
    private CourierAttributesMapper courierAttributesMapper;
    

    @Autowired
    private CourierAttributesService courierAttributesService;

    /**
     * This repository is mocked in the com.hk.logistics.repository.search test package.
     *
     * @see com.hk.logistics.repository.search.CourierAttributesSearchRepositoryMockConfiguration
     */
    @Autowired
    private CourierAttributesSearchRepository mockCourierAttributesSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourierAttributesMockMvc;

    private CourierAttributes courierAttributes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourierAttributesResource courierAttributesResource = new CourierAttributesResource(courierAttributesService);
        this.restCourierAttributesMockMvc = MockMvcBuilders.standaloneSetup(courierAttributesResource)
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
    public static CourierAttributes createEntity(EntityManager em) {
        CourierAttributes courierAttributes = new CourierAttributes()
            .prepaidAir(DEFAULT_PREPAID_AIR)
            .prepaidGround(DEFAULT_PREPAID_GROUND)
            .codAir(DEFAULT_COD_AIR)
            .codGround(DEFAULT_COD_GROUND)
            .reverseAir(DEFAULT_REVERSE_AIR)
            .reverseGround(DEFAULT_REVERSE_GROUND)
            .cardOnDeliveryAir(DEFAULT_CARD_ON_DELIVERY_AIR)
            .cardOnDeliveryGround(DEFAULT_CARD_ON_DELIVERY_GROUND);
        return courierAttributes;
    }

    @Before
    public void initTest() {
        courierAttributes = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourierAttributes() throws Exception {
        int databaseSizeBeforeCreate = courierAttributesRepository.findAll().size();

        // Create the CourierAttributes
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);
        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isCreated());

        // Validate the CourierAttributes in the database
        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeCreate + 1);
        CourierAttributes testCourierAttributes = courierAttributesList.get(courierAttributesList.size() - 1);
        assertThat(testCourierAttributes.isPrepaidAir()).isEqualTo(DEFAULT_PREPAID_AIR);
        assertThat(testCourierAttributes.isPrepaidGround()).isEqualTo(DEFAULT_PREPAID_GROUND);
        assertThat(testCourierAttributes.isCodAir()).isEqualTo(DEFAULT_COD_AIR);
        assertThat(testCourierAttributes.isCodGround()).isEqualTo(DEFAULT_COD_GROUND);
        assertThat(testCourierAttributes.isReverseAir()).isEqualTo(DEFAULT_REVERSE_AIR);
        assertThat(testCourierAttributes.isReverseGround()).isEqualTo(DEFAULT_REVERSE_GROUND);
        assertThat(testCourierAttributes.isCardOnDeliveryAir()).isEqualTo(DEFAULT_CARD_ON_DELIVERY_AIR);
        assertThat(testCourierAttributes.isCardOnDeliveryGround()).isEqualTo(DEFAULT_CARD_ON_DELIVERY_GROUND);

        // Validate the CourierAttributes in Elasticsearch
        verify(mockCourierAttributesSearchRepository, times(1)).save(testCourierAttributes);
    }

    @Test
    @Transactional
    public void createCourierAttributesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courierAttributesRepository.findAll().size();

        // Create the CourierAttributes with an existing ID
        courierAttributes.setId(1L);
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourierAttributes in the database
        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeCreate);

        // Validate the CourierAttributes in Elasticsearch
        verify(mockCourierAttributesSearchRepository, times(0)).save(courierAttributes);
    }

    @Test
    @Transactional
    public void checkPrepaidAirIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setPrepaidAir(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrepaidGroundIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setPrepaidGround(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodAirIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setCodAir(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodGroundIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setCodGround(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReverseAirIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setReverseAir(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReverseGroundIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setReverseGround(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCardOnDeliveryAirIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setCardOnDeliveryAir(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCardOnDeliveryGroundIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierAttributesRepository.findAll().size();
        // set the field null
        courierAttributes.setCardOnDeliveryGround(null);

        // Create the CourierAttributes, which fails.
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        restCourierAttributesMockMvc.perform(post("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCourierAttributes() throws Exception {
        // Initialize the database
        courierAttributesRepository.saveAndFlush(courierAttributes);

        // Get all the courierAttributesList
        restCourierAttributesMockMvc.perform(get("/api/courier-attributes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courierAttributes.getId().intValue())))
            .andExpect(jsonPath("$.[*].prepaidAir").value(hasItem(DEFAULT_PREPAID_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].prepaidGround").value(hasItem(DEFAULT_PREPAID_GROUND.booleanValue())))
            .andExpect(jsonPath("$.[*].codAir").value(hasItem(DEFAULT_COD_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].codGround").value(hasItem(DEFAULT_COD_GROUND.booleanValue())))
            .andExpect(jsonPath("$.[*].reverseAir").value(hasItem(DEFAULT_REVERSE_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].reverseGround").value(hasItem(DEFAULT_REVERSE_GROUND.booleanValue())))
            .andExpect(jsonPath("$.[*].cardOnDeliveryAir").value(hasItem(DEFAULT_CARD_ON_DELIVERY_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].cardOnDeliveryGround").value(hasItem(DEFAULT_CARD_ON_DELIVERY_GROUND.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getCourierAttributes() throws Exception {
        // Initialize the database
        courierAttributesRepository.saveAndFlush(courierAttributes);

        // Get the courierAttributes
        restCourierAttributesMockMvc.perform(get("/api/courier-attributes/{id}", courierAttributes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courierAttributes.getId().intValue()))
            .andExpect(jsonPath("$.prepaidAir").value(DEFAULT_PREPAID_AIR.booleanValue()))
            .andExpect(jsonPath("$.prepaidGround").value(DEFAULT_PREPAID_GROUND.booleanValue()))
            .andExpect(jsonPath("$.codAir").value(DEFAULT_COD_AIR.booleanValue()))
            .andExpect(jsonPath("$.codGround").value(DEFAULT_COD_GROUND.booleanValue()))
            .andExpect(jsonPath("$.reverseAir").value(DEFAULT_REVERSE_AIR.booleanValue()))
            .andExpect(jsonPath("$.reverseGround").value(DEFAULT_REVERSE_GROUND.booleanValue()))
            .andExpect(jsonPath("$.cardOnDeliveryAir").value(DEFAULT_CARD_ON_DELIVERY_AIR.booleanValue()))
            .andExpect(jsonPath("$.cardOnDeliveryGround").value(DEFAULT_CARD_ON_DELIVERY_GROUND.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCourierAttributes() throws Exception {
        // Get the courierAttributes
        restCourierAttributesMockMvc.perform(get("/api/courier-attributes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourierAttributes() throws Exception {
        // Initialize the database
        courierAttributesRepository.saveAndFlush(courierAttributes);

        int databaseSizeBeforeUpdate = courierAttributesRepository.findAll().size();

        // Update the courierAttributes
        CourierAttributes updatedCourierAttributes = courierAttributesRepository.findById(courierAttributes.getId()).get();
        // Disconnect from session so that the updates on updatedCourierAttributes are not directly saved in db
        em.detach(updatedCourierAttributes);
        updatedCourierAttributes
            .prepaidAir(UPDATED_PREPAID_AIR)
            .prepaidGround(UPDATED_PREPAID_GROUND)
            .codAir(UPDATED_COD_AIR)
            .codGround(UPDATED_COD_GROUND)
            .reverseAir(UPDATED_REVERSE_AIR)
            .reverseGround(UPDATED_REVERSE_GROUND)
            .cardOnDeliveryAir(UPDATED_CARD_ON_DELIVERY_AIR)
            .cardOnDeliveryGround(UPDATED_CARD_ON_DELIVERY_GROUND);
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(updatedCourierAttributes);

        restCourierAttributesMockMvc.perform(put("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isOk());

        // Validate the CourierAttributes in the database
        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeUpdate);
        CourierAttributes testCourierAttributes = courierAttributesList.get(courierAttributesList.size() - 1);
        assertThat(testCourierAttributes.isPrepaidAir()).isEqualTo(UPDATED_PREPAID_AIR);
        assertThat(testCourierAttributes.isPrepaidGround()).isEqualTo(UPDATED_PREPAID_GROUND);
        assertThat(testCourierAttributes.isCodAir()).isEqualTo(UPDATED_COD_AIR);
        assertThat(testCourierAttributes.isCodGround()).isEqualTo(UPDATED_COD_GROUND);
        assertThat(testCourierAttributes.isReverseAir()).isEqualTo(UPDATED_REVERSE_AIR);
        assertThat(testCourierAttributes.isReverseGround()).isEqualTo(UPDATED_REVERSE_GROUND);
        assertThat(testCourierAttributes.isCardOnDeliveryAir()).isEqualTo(UPDATED_CARD_ON_DELIVERY_AIR);
        assertThat(testCourierAttributes.isCardOnDeliveryGround()).isEqualTo(UPDATED_CARD_ON_DELIVERY_GROUND);

        // Validate the CourierAttributes in Elasticsearch
        verify(mockCourierAttributesSearchRepository, times(1)).save(testCourierAttributes);
    }

    @Test
    @Transactional
    public void updateNonExistingCourierAttributes() throws Exception {
        int databaseSizeBeforeUpdate = courierAttributesRepository.findAll().size();

        // Create the CourierAttributes
        CourierAttributesDTO courierAttributesDTO = courierAttributesMapper.toDto(courierAttributes);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourierAttributesMockMvc.perform(put("/api/courier-attributes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierAttributesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourierAttributes in the database
        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeUpdate);

        // Validate the CourierAttributes in Elasticsearch
        verify(mockCourierAttributesSearchRepository, times(0)).save(courierAttributes);
    }

    @Test
    @Transactional
    public void deleteCourierAttributes() throws Exception {
        // Initialize the database
        courierAttributesRepository.saveAndFlush(courierAttributes);

        int databaseSizeBeforeDelete = courierAttributesRepository.findAll().size();

        // Get the courierAttributes
        restCourierAttributesMockMvc.perform(delete("/api/courier-attributes/{id}", courierAttributes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CourierAttributes> courierAttributesList = courierAttributesRepository.findAll();
        assertThat(courierAttributesList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the CourierAttributes in Elasticsearch
        verify(mockCourierAttributesSearchRepository, times(1)).deleteById(courierAttributes.getId());
    }

    @Test
    @Transactional
    public void searchCourierAttributes() throws Exception {
        // Initialize the database
        courierAttributesRepository.saveAndFlush(courierAttributes);
        when(mockCourierAttributesSearchRepository.search(queryStringQuery("id:" + courierAttributes.getId())))
            .thenReturn(Collections.singletonList(courierAttributes));
        // Search the courierAttributes
        restCourierAttributesMockMvc.perform(get("/api/_search/courier-attributes?query=id:" + courierAttributes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courierAttributes.getId().intValue())))
            .andExpect(jsonPath("$.[*].prepaidAir").value(hasItem(DEFAULT_PREPAID_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].prepaidGround").value(hasItem(DEFAULT_PREPAID_GROUND.booleanValue())))
            .andExpect(jsonPath("$.[*].codAir").value(hasItem(DEFAULT_COD_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].codGround").value(hasItem(DEFAULT_COD_GROUND.booleanValue())))
            .andExpect(jsonPath("$.[*].reverseAir").value(hasItem(DEFAULT_REVERSE_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].reverseGround").value(hasItem(DEFAULT_REVERSE_GROUND.booleanValue())))
            .andExpect(jsonPath("$.[*].cardOnDeliveryAir").value(hasItem(DEFAULT_CARD_ON_DELIVERY_AIR.booleanValue())))
            .andExpect(jsonPath("$.[*].cardOnDeliveryGround").value(hasItem(DEFAULT_CARD_ON_DELIVERY_GROUND.booleanValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourierAttributes.class);
        CourierAttributes courierAttributes1 = new CourierAttributes();
        courierAttributes1.setId(1L);
        CourierAttributes courierAttributes2 = new CourierAttributes();
        courierAttributes2.setId(courierAttributes1.getId());
        assertThat(courierAttributes1).isEqualTo(courierAttributes2);
        courierAttributes2.setId(2L);
        assertThat(courierAttributes1).isNotEqualTo(courierAttributes2);
        courierAttributes1.setId(null);
        assertThat(courierAttributes1).isNotEqualTo(courierAttributes2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourierAttributesDTO.class);
        CourierAttributesDTO courierAttributesDTO1 = new CourierAttributesDTO();
        courierAttributesDTO1.setId(1L);
        CourierAttributesDTO courierAttributesDTO2 = new CourierAttributesDTO();
        assertThat(courierAttributesDTO1).isNotEqualTo(courierAttributesDTO2);
        courierAttributesDTO2.setId(courierAttributesDTO1.getId());
        assertThat(courierAttributesDTO1).isEqualTo(courierAttributesDTO2);
        courierAttributesDTO2.setId(2L);
        assertThat(courierAttributesDTO1).isNotEqualTo(courierAttributesDTO2);
        courierAttributesDTO1.setId(null);
        assertThat(courierAttributesDTO1).isNotEqualTo(courierAttributesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(courierAttributesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(courierAttributesMapper.fromId(null)).isNull();
    }
}
