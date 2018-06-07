package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.Courier;
import com.hk.test.repository.CourierRepository;
import com.hk.test.service.dto.CourierDTO;
import com.hk.test.service.mapper.CourierMapper;
import com.hk.test.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CourierResource REST controller.
 *
 * @see CourierResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class CourierResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_TRACKING_PARAMETER = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_PARAMETER = "BBBBBBBBBB";

    private static final String DEFAULT_TRACKING_URL = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_URL = "BBBBBBBBBB";

    private static final Long DEFAULT_PARENT_COURIER_ID = 1L;
    private static final Long UPDATED_PARENT_COURIER_ID = 2L;

    @Autowired
    private CourierRepository courierRepository;
    @Mock
    private CourierRepository courierRepositoryMock;

    @Autowired
    private CourierMapper courierMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourierMockMvc;

    private Courier courier;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourierResource courierResource = new CourierResource(courierRepository, courierMapper);
        this.restCourierMockMvc = MockMvcBuilders.standaloneSetup(courierResource)
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
    public static Courier createEntity(EntityManager em) {
        Courier courier = new Courier()
            .name(DEFAULT_NAME)
            .active(DEFAULT_ACTIVE)
            .trackingParameter(DEFAULT_TRACKING_PARAMETER)
            .trackingUrl(DEFAULT_TRACKING_URL)
            .parentCourierId(DEFAULT_PARENT_COURIER_ID);
        return courier;
    }

    @Before
    public void initTest() {
        courier = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourier() throws Exception {
        int databaseSizeBeforeCreate = courierRepository.findAll().size();

        // Create the Courier
        CourierDTO courierDTO = courierMapper.toDto(courier);
        restCourierMockMvc.perform(post("/api/couriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierDTO)))
            .andExpect(status().isCreated());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeCreate + 1);
        Courier testCourier = courierList.get(courierList.size() - 1);
        assertThat(testCourier.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCourier.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testCourier.getTrackingParameter()).isEqualTo(DEFAULT_TRACKING_PARAMETER);
        assertThat(testCourier.getTrackingUrl()).isEqualTo(DEFAULT_TRACKING_URL);
        assertThat(testCourier.getParentCourierId()).isEqualTo(DEFAULT_PARENT_COURIER_ID);
    }

    @Test
    @Transactional
    public void createCourierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courierRepository.findAll().size();

        // Create the Courier with an existing ID
        courier.setId(1L);
        CourierDTO courierDTO = courierMapper.toDto(courier);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourierMockMvc.perform(post("/api/couriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierRepository.findAll().size();
        // set the field null
        courier.setName(null);

        // Create the Courier, which fails.
        CourierDTO courierDTO = courierMapper.toDto(courier);

        restCourierMockMvc.perform(post("/api/couriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierDTO)))
            .andExpect(status().isBadRequest());

        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierRepository.findAll().size();
        // set the field null
        courier.setActive(null);

        // Create the Courier, which fails.
        CourierDTO courierDTO = courierMapper.toDto(courier);

        restCourierMockMvc.perform(post("/api/couriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierDTO)))
            .andExpect(status().isBadRequest());

        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCouriers() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        // Get all the courierList
        restCourierMockMvc.perform(get("/api/couriers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courier.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].trackingParameter").value(hasItem(DEFAULT_TRACKING_PARAMETER.toString())))
            .andExpect(jsonPath("$.[*].trackingUrl").value(hasItem(DEFAULT_TRACKING_URL.toString())))
            .andExpect(jsonPath("$.[*].parentCourierId").value(hasItem(DEFAULT_PARENT_COURIER_ID.intValue())));
    }
    
    public void getAllCouriersWithEagerRelationshipsIsEnabled() throws Exception {
        CourierResource courierResource = new CourierResource(courierRepositoryMock, courierMapper);
        when(courierRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCourierMockMvc = MockMvcBuilders.standaloneSetup(courierResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCourierMockMvc.perform(get("/api/couriers?eagerload=true"))
        .andExpect(status().isOk());

        verify(courierRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllCouriersWithEagerRelationshipsIsNotEnabled() throws Exception {
        CourierResource courierResource = new CourierResource(courierRepositoryMock, courierMapper);
            when(courierRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCourierMockMvc = MockMvcBuilders.standaloneSetup(courierResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCourierMockMvc.perform(get("/api/couriers?eagerload=true"))
        .andExpect(status().isOk());

            verify(courierRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCourier() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        // Get the courier
        restCourierMockMvc.perform(get("/api/couriers/{id}", courier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courier.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.trackingParameter").value(DEFAULT_TRACKING_PARAMETER.toString()))
            .andExpect(jsonPath("$.trackingUrl").value(DEFAULT_TRACKING_URL.toString()))
            .andExpect(jsonPath("$.parentCourierId").value(DEFAULT_PARENT_COURIER_ID.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCourier() throws Exception {
        // Get the courier
        restCourierMockMvc.perform(get("/api/couriers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourier() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        int databaseSizeBeforeUpdate = courierRepository.findAll().size();

        // Update the courier
        Courier updatedCourier = courierRepository.findById(courier.getId()).get();
        // Disconnect from session so that the updates on updatedCourier are not directly saved in db
        em.detach(updatedCourier);
        updatedCourier
            .name(UPDATED_NAME)
            .active(UPDATED_ACTIVE)
            .trackingParameter(UPDATED_TRACKING_PARAMETER)
            .trackingUrl(UPDATED_TRACKING_URL)
            .parentCourierId(UPDATED_PARENT_COURIER_ID);
        CourierDTO courierDTO = courierMapper.toDto(updatedCourier);

        restCourierMockMvc.perform(put("/api/couriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierDTO)))
            .andExpect(status().isOk());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeUpdate);
        Courier testCourier = courierList.get(courierList.size() - 1);
        assertThat(testCourier.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCourier.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testCourier.getTrackingParameter()).isEqualTo(UPDATED_TRACKING_PARAMETER);
        assertThat(testCourier.getTrackingUrl()).isEqualTo(UPDATED_TRACKING_URL);
        assertThat(testCourier.getParentCourierId()).isEqualTo(UPDATED_PARENT_COURIER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingCourier() throws Exception {
        int databaseSizeBeforeUpdate = courierRepository.findAll().size();

        // Create the Courier
        CourierDTO courierDTO = courierMapper.toDto(courier);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourierMockMvc.perform(put("/api/couriers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Courier in the database
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourier() throws Exception {
        // Initialize the database
        courierRepository.saveAndFlush(courier);

        int databaseSizeBeforeDelete = courierRepository.findAll().size();

        // Get the courier
        restCourierMockMvc.perform(delete("/api/couriers/{id}", courier.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Courier> courierList = courierRepository.findAll();
        assertThat(courierList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Courier.class);
        Courier courier1 = new Courier();
        courier1.setId(1L);
        Courier courier2 = new Courier();
        courier2.setId(courier1.getId());
        assertThat(courier1).isEqualTo(courier2);
        courier2.setId(2L);
        assertThat(courier1).isNotEqualTo(courier2);
        courier1.setId(null);
        assertThat(courier1).isNotEqualTo(courier2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourierDTO.class);
        CourierDTO courierDTO1 = new CourierDTO();
        courierDTO1.setId(1L);
        CourierDTO courierDTO2 = new CourierDTO();
        assertThat(courierDTO1).isNotEqualTo(courierDTO2);
        courierDTO2.setId(courierDTO1.getId());
        assertThat(courierDTO1).isEqualTo(courierDTO2);
        courierDTO2.setId(2L);
        assertThat(courierDTO1).isNotEqualTo(courierDTO2);
        courierDTO1.setId(null);
        assertThat(courierDTO1).isNotEqualTo(courierDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(courierMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(courierMapper.fromId(null)).isNull();
    }
}
