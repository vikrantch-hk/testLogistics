package com.hk.logistics.web.rest;

import com.hk.logistics.TestLogisticsApp;

import com.hk.logistics.domain.AwbStatus;
import com.hk.logistics.repository.AwbStatusRepository;
import com.hk.logistics.service.dto.AwbStatusDTO;
import com.hk.logistics.service.mapper.AwbStatusMapper;
import com.hk.logistics.web.rest.errors.ExceptionTranslator;

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

import static com.hk.logistics.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AwbStatusResource REST controller.
 *
 * @see AwbStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class AwbStatusResourceIntTest {

    private static final String DEFAULT_AWB_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_AWB_STATUS = "BBBBBBBBBB";

    @Autowired
    private AwbStatusRepository awbStatusRepository;


    @Autowired
    private AwbStatusMapper awbStatusMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAwbStatusMockMvc;

    private AwbStatus awbStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AwbStatusResource awbStatusResource = new AwbStatusResource(awbStatusRepository, awbStatusMapper);
        this.restAwbStatusMockMvc = MockMvcBuilders.standaloneSetup(awbStatusResource)
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
    public static AwbStatus createEntity(EntityManager em) {
        AwbStatus awbStatus = new AwbStatus()
            .awbStatus(DEFAULT_AWB_STATUS);
        return awbStatus;
    }

    @Before
    public void initTest() {
        awbStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createAwbStatus() throws Exception {
        int databaseSizeBeforeCreate = awbStatusRepository.findAll().size();

        // Create the AwbStatus
        AwbStatusDTO awbStatusDTO = awbStatusMapper.toDto(awbStatus);
        restAwbStatusMockMvc.perform(post("/api/awb-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awbStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the AwbStatus in the database
        List<AwbStatus> awbStatusList = awbStatusRepository.findAll();
        assertThat(awbStatusList).hasSize(databaseSizeBeforeCreate + 1);
        AwbStatus testAwbStatus = awbStatusList.get(awbStatusList.size() - 1);
        assertThat(testAwbStatus.getAwbStatus()).isEqualTo(DEFAULT_AWB_STATUS);
    }

    @Test
    @Transactional
    public void createAwbStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = awbStatusRepository.findAll().size();

        // Create the AwbStatus with an existing ID
        awbStatus.setId(1L);
        AwbStatusDTO awbStatusDTO = awbStatusMapper.toDto(awbStatus);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAwbStatusMockMvc.perform(post("/api/awb-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awbStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AwbStatus in the database
        List<AwbStatus> awbStatusList = awbStatusRepository.findAll();
        assertThat(awbStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAwbStatuses() throws Exception {
        // Initialize the database
        awbStatusRepository.saveAndFlush(awbStatus);

        // Get all the awbStatusList
        restAwbStatusMockMvc.perform(get("/api/awb-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(awbStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].awbStatus").value(hasItem(DEFAULT_AWB_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getAwbStatus() throws Exception {
        // Initialize the database
        awbStatusRepository.saveAndFlush(awbStatus);

        // Get the awbStatus
        restAwbStatusMockMvc.perform(get("/api/awb-statuses/{id}", awbStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(awbStatus.getId().intValue()))
            .andExpect(jsonPath("$.awbStatus").value(DEFAULT_AWB_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAwbStatus() throws Exception {
        // Get the awbStatus
        restAwbStatusMockMvc.perform(get("/api/awb-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAwbStatus() throws Exception {
        // Initialize the database
        awbStatusRepository.saveAndFlush(awbStatus);

        int databaseSizeBeforeUpdate = awbStatusRepository.findAll().size();

        // Update the awbStatus
        AwbStatus updatedAwbStatus = awbStatusRepository.findById(awbStatus.getId()).get();
        // Disconnect from session so that the updates on updatedAwbStatus are not directly saved in db
        em.detach(updatedAwbStatus);
        updatedAwbStatus
            .awbStatus(UPDATED_AWB_STATUS);
        AwbStatusDTO awbStatusDTO = awbStatusMapper.toDto(updatedAwbStatus);

        restAwbStatusMockMvc.perform(put("/api/awb-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awbStatusDTO)))
            .andExpect(status().isOk());

        // Validate the AwbStatus in the database
        List<AwbStatus> awbStatusList = awbStatusRepository.findAll();
        assertThat(awbStatusList).hasSize(databaseSizeBeforeUpdate);
        AwbStatus testAwbStatus = awbStatusList.get(awbStatusList.size() - 1);
        assertThat(testAwbStatus.getAwbStatus()).isEqualTo(UPDATED_AWB_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAwbStatus() throws Exception {
        int databaseSizeBeforeUpdate = awbStatusRepository.findAll().size();

        // Create the AwbStatus
        AwbStatusDTO awbStatusDTO = awbStatusMapper.toDto(awbStatus);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAwbStatusMockMvc.perform(put("/api/awb-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(awbStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AwbStatus in the database
        List<AwbStatus> awbStatusList = awbStatusRepository.findAll();
        assertThat(awbStatusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAwbStatus() throws Exception {
        // Initialize the database
        awbStatusRepository.saveAndFlush(awbStatus);

        int databaseSizeBeforeDelete = awbStatusRepository.findAll().size();

        // Get the awbStatus
        restAwbStatusMockMvc.perform(delete("/api/awb-statuses/{id}", awbStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AwbStatus> awbStatusList = awbStatusRepository.findAll();
        assertThat(awbStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AwbStatus.class);
        AwbStatus awbStatus1 = new AwbStatus();
        awbStatus1.setId(1L);
        AwbStatus awbStatus2 = new AwbStatus();
        awbStatus2.setId(awbStatus1.getId());
        assertThat(awbStatus1).isEqualTo(awbStatus2);
        awbStatus2.setId(2L);
        assertThat(awbStatus1).isNotEqualTo(awbStatus2);
        awbStatus1.setId(null);
        assertThat(awbStatus1).isNotEqualTo(awbStatus2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AwbStatusDTO.class);
        AwbStatusDTO awbStatusDTO1 = new AwbStatusDTO();
        awbStatusDTO1.setId(1L);
        AwbStatusDTO awbStatusDTO2 = new AwbStatusDTO();
        assertThat(awbStatusDTO1).isNotEqualTo(awbStatusDTO2);
        awbStatusDTO2.setId(awbStatusDTO1.getId());
        assertThat(awbStatusDTO1).isEqualTo(awbStatusDTO2);
        awbStatusDTO2.setId(2L);
        assertThat(awbStatusDTO1).isNotEqualTo(awbStatusDTO2);
        awbStatusDTO1.setId(null);
        assertThat(awbStatusDTO1).isNotEqualTo(awbStatusDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(awbStatusMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(awbStatusMapper.fromId(null)).isNull();
    }
}
