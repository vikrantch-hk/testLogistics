package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.CourierPickupInfo;
import com.hk.test.repository.CourierPickupInfoRepository;
import com.hk.test.service.dto.CourierPickupInfoDTO;
import com.hk.test.service.mapper.CourierPickupInfoMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.ArrayList;

import static com.hk.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CourierPickupInfoResource REST controller.
 *
 * @see CourierPickupInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class CourierPickupInfoResourceIntTest {

    private static final String DEFAULT_PICKUP_CONFIRMATION_NO = "AAAAAAAAAA";
    private static final String UPDATED_PICKUP_CONFIRMATION_NO = "BBBBBBBBBB";

    private static final String DEFAULT_TRACKING_NO = "AAAAAAAAAA";
    private static final String UPDATED_TRACKING_NO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_PICKUP_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_PICKUP_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CourierPickupInfoRepository courierPickupInfoRepository;


    @Autowired
    private CourierPickupInfoMapper courierPickupInfoMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourierPickupInfoMockMvc;

    private CourierPickupInfo courierPickupInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourierPickupInfoResource courierPickupInfoResource = new CourierPickupInfoResource(courierPickupInfoRepository, courierPickupInfoMapper);
        this.restCourierPickupInfoMockMvc = MockMvcBuilders.standaloneSetup(courierPickupInfoResource)
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
    public static CourierPickupInfo createEntity(EntityManager em) {
        CourierPickupInfo courierPickupInfo = new CourierPickupInfo()
            .pickupConfirmationNo(DEFAULT_PICKUP_CONFIRMATION_NO)
            .trackingNo(DEFAULT_TRACKING_NO)
            .pickupDate(DEFAULT_PICKUP_DATE);
        return courierPickupInfo;
    }

    @Before
    public void initTest() {
        courierPickupInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourierPickupInfo() throws Exception {
        int databaseSizeBeforeCreate = courierPickupInfoRepository.findAll().size();

        // Create the CourierPickupInfo
        CourierPickupInfoDTO courierPickupInfoDTO = courierPickupInfoMapper.toDto(courierPickupInfo);
        restCourierPickupInfoMockMvc.perform(post("/api/courier-pickup-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierPickupInfoDTO)))
            .andExpect(status().isCreated());

        // Validate the CourierPickupInfo in the database
        List<CourierPickupInfo> courierPickupInfoList = courierPickupInfoRepository.findAll();
        assertThat(courierPickupInfoList).hasSize(databaseSizeBeforeCreate + 1);
        CourierPickupInfo testCourierPickupInfo = courierPickupInfoList.get(courierPickupInfoList.size() - 1);
        assertThat(testCourierPickupInfo.getPickupConfirmationNo()).isEqualTo(DEFAULT_PICKUP_CONFIRMATION_NO);
        assertThat(testCourierPickupInfo.getTrackingNo()).isEqualTo(DEFAULT_TRACKING_NO);
        assertThat(testCourierPickupInfo.getPickupDate()).isEqualTo(DEFAULT_PICKUP_DATE);
    }

    @Test
    @Transactional
    public void createCourierPickupInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courierPickupInfoRepository.findAll().size();

        // Create the CourierPickupInfo with an existing ID
        courierPickupInfo.setId(1L);
        CourierPickupInfoDTO courierPickupInfoDTO = courierPickupInfoMapper.toDto(courierPickupInfo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourierPickupInfoMockMvc.perform(post("/api/courier-pickup-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierPickupInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourierPickupInfo in the database
        List<CourierPickupInfo> courierPickupInfoList = courierPickupInfoRepository.findAll();
        assertThat(courierPickupInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPickupDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = courierPickupInfoRepository.findAll().size();
        // set the field null
        courierPickupInfo.setPickupDate(null);

        // Create the CourierPickupInfo, which fails.
        CourierPickupInfoDTO courierPickupInfoDTO = courierPickupInfoMapper.toDto(courierPickupInfo);

        restCourierPickupInfoMockMvc.perform(post("/api/courier-pickup-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierPickupInfoDTO)))
            .andExpect(status().isBadRequest());

        List<CourierPickupInfo> courierPickupInfoList = courierPickupInfoRepository.findAll();
        assertThat(courierPickupInfoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCourierPickupInfos() throws Exception {
        // Initialize the database
        courierPickupInfoRepository.saveAndFlush(courierPickupInfo);

        // Get all the courierPickupInfoList
        restCourierPickupInfoMockMvc.perform(get("/api/courier-pickup-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courierPickupInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].pickupConfirmationNo").value(hasItem(DEFAULT_PICKUP_CONFIRMATION_NO.toString())))
            .andExpect(jsonPath("$.[*].trackingNo").value(hasItem(DEFAULT_TRACKING_NO.toString())))
            .andExpect(jsonPath("$.[*].pickupDate").value(hasItem(DEFAULT_PICKUP_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getCourierPickupInfo() throws Exception {
        // Initialize the database
        courierPickupInfoRepository.saveAndFlush(courierPickupInfo);

        // Get the courierPickupInfo
        restCourierPickupInfoMockMvc.perform(get("/api/courier-pickup-infos/{id}", courierPickupInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courierPickupInfo.getId().intValue()))
            .andExpect(jsonPath("$.pickupConfirmationNo").value(DEFAULT_PICKUP_CONFIRMATION_NO.toString()))
            .andExpect(jsonPath("$.trackingNo").value(DEFAULT_TRACKING_NO.toString()))
            .andExpect(jsonPath("$.pickupDate").value(DEFAULT_PICKUP_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCourierPickupInfo() throws Exception {
        // Get the courierPickupInfo
        restCourierPickupInfoMockMvc.perform(get("/api/courier-pickup-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourierPickupInfo() throws Exception {
        // Initialize the database
        courierPickupInfoRepository.saveAndFlush(courierPickupInfo);

        int databaseSizeBeforeUpdate = courierPickupInfoRepository.findAll().size();

        // Update the courierPickupInfo
        CourierPickupInfo updatedCourierPickupInfo = courierPickupInfoRepository.findById(courierPickupInfo.getId()).get();
        // Disconnect from session so that the updates on updatedCourierPickupInfo are not directly saved in db
        em.detach(updatedCourierPickupInfo);
        updatedCourierPickupInfo
            .pickupConfirmationNo(UPDATED_PICKUP_CONFIRMATION_NO)
            .trackingNo(UPDATED_TRACKING_NO)
            .pickupDate(UPDATED_PICKUP_DATE);
        CourierPickupInfoDTO courierPickupInfoDTO = courierPickupInfoMapper.toDto(updatedCourierPickupInfo);

        restCourierPickupInfoMockMvc.perform(put("/api/courier-pickup-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierPickupInfoDTO)))
            .andExpect(status().isOk());

        // Validate the CourierPickupInfo in the database
        List<CourierPickupInfo> courierPickupInfoList = courierPickupInfoRepository.findAll();
        assertThat(courierPickupInfoList).hasSize(databaseSizeBeforeUpdate);
        CourierPickupInfo testCourierPickupInfo = courierPickupInfoList.get(courierPickupInfoList.size() - 1);
        assertThat(testCourierPickupInfo.getPickupConfirmationNo()).isEqualTo(UPDATED_PICKUP_CONFIRMATION_NO);
        assertThat(testCourierPickupInfo.getTrackingNo()).isEqualTo(UPDATED_TRACKING_NO);
        assertThat(testCourierPickupInfo.getPickupDate()).isEqualTo(UPDATED_PICKUP_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCourierPickupInfo() throws Exception {
        int databaseSizeBeforeUpdate = courierPickupInfoRepository.findAll().size();

        // Create the CourierPickupInfo
        CourierPickupInfoDTO courierPickupInfoDTO = courierPickupInfoMapper.toDto(courierPickupInfo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourierPickupInfoMockMvc.perform(put("/api/courier-pickup-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierPickupInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourierPickupInfo in the database
        List<CourierPickupInfo> courierPickupInfoList = courierPickupInfoRepository.findAll();
        assertThat(courierPickupInfoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourierPickupInfo() throws Exception {
        // Initialize the database
        courierPickupInfoRepository.saveAndFlush(courierPickupInfo);

        int databaseSizeBeforeDelete = courierPickupInfoRepository.findAll().size();

        // Get the courierPickupInfo
        restCourierPickupInfoMockMvc.perform(delete("/api/courier-pickup-infos/{id}", courierPickupInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CourierPickupInfo> courierPickupInfoList = courierPickupInfoRepository.findAll();
        assertThat(courierPickupInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourierPickupInfo.class);
        CourierPickupInfo courierPickupInfo1 = new CourierPickupInfo();
        courierPickupInfo1.setId(1L);
        CourierPickupInfo courierPickupInfo2 = new CourierPickupInfo();
        courierPickupInfo2.setId(courierPickupInfo1.getId());
        assertThat(courierPickupInfo1).isEqualTo(courierPickupInfo2);
        courierPickupInfo2.setId(2L);
        assertThat(courierPickupInfo1).isNotEqualTo(courierPickupInfo2);
        courierPickupInfo1.setId(null);
        assertThat(courierPickupInfo1).isNotEqualTo(courierPickupInfo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourierPickupInfoDTO.class);
        CourierPickupInfoDTO courierPickupInfoDTO1 = new CourierPickupInfoDTO();
        courierPickupInfoDTO1.setId(1L);
        CourierPickupInfoDTO courierPickupInfoDTO2 = new CourierPickupInfoDTO();
        assertThat(courierPickupInfoDTO1).isNotEqualTo(courierPickupInfoDTO2);
        courierPickupInfoDTO2.setId(courierPickupInfoDTO1.getId());
        assertThat(courierPickupInfoDTO1).isEqualTo(courierPickupInfoDTO2);
        courierPickupInfoDTO2.setId(2L);
        assertThat(courierPickupInfoDTO1).isNotEqualTo(courierPickupInfoDTO2);
        courierPickupInfoDTO1.setId(null);
        assertThat(courierPickupInfoDTO1).isNotEqualTo(courierPickupInfoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(courierPickupInfoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(courierPickupInfoMapper.fromId(null)).isNull();
    }
}
