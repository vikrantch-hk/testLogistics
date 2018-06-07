package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.PickupStatus;
import com.hk.test.repository.PickupStatusRepository;
import com.hk.test.service.dto.PickupStatusDTO;
import com.hk.test.service.mapper.PickupStatusMapper;
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
 * Test class for the PickupStatusResource REST controller.
 *
 * @see PickupStatusResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class PickupStatusResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PickupStatusRepository pickupStatusRepository;


    @Autowired
    private PickupStatusMapper pickupStatusMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPickupStatusMockMvc;

    private PickupStatus pickupStatus;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PickupStatusResource pickupStatusResource = new PickupStatusResource(pickupStatusRepository, pickupStatusMapper);
        this.restPickupStatusMockMvc = MockMvcBuilders.standaloneSetup(pickupStatusResource)
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
    public static PickupStatus createEntity(EntityManager em) {
        PickupStatus pickupStatus = new PickupStatus()
            .name(DEFAULT_NAME);
        return pickupStatus;
    }

    @Before
    public void initTest() {
        pickupStatus = createEntity(em);
    }

    @Test
    @Transactional
    public void createPickupStatus() throws Exception {
        int databaseSizeBeforeCreate = pickupStatusRepository.findAll().size();

        // Create the PickupStatus
        PickupStatusDTO pickupStatusDTO = pickupStatusMapper.toDto(pickupStatus);
        restPickupStatusMockMvc.perform(post("/api/pickup-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pickupStatusDTO)))
            .andExpect(status().isCreated());

        // Validate the PickupStatus in the database
        List<PickupStatus> pickupStatusList = pickupStatusRepository.findAll();
        assertThat(pickupStatusList).hasSize(databaseSizeBeforeCreate + 1);
        PickupStatus testPickupStatus = pickupStatusList.get(pickupStatusList.size() - 1);
        assertThat(testPickupStatus.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPickupStatusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pickupStatusRepository.findAll().size();

        // Create the PickupStatus with an existing ID
        pickupStatus.setId(1L);
        PickupStatusDTO pickupStatusDTO = pickupStatusMapper.toDto(pickupStatus);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPickupStatusMockMvc.perform(post("/api/pickup-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pickupStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PickupStatus in the database
        List<PickupStatus> pickupStatusList = pickupStatusRepository.findAll();
        assertThat(pickupStatusList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPickupStatuses() throws Exception {
        // Initialize the database
        pickupStatusRepository.saveAndFlush(pickupStatus);

        // Get all the pickupStatusList
        restPickupStatusMockMvc.perform(get("/api/pickup-statuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pickupStatus.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getPickupStatus() throws Exception {
        // Initialize the database
        pickupStatusRepository.saveAndFlush(pickupStatus);

        // Get the pickupStatus
        restPickupStatusMockMvc.perform(get("/api/pickup-statuses/{id}", pickupStatus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pickupStatus.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPickupStatus() throws Exception {
        // Get the pickupStatus
        restPickupStatusMockMvc.perform(get("/api/pickup-statuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePickupStatus() throws Exception {
        // Initialize the database
        pickupStatusRepository.saveAndFlush(pickupStatus);

        int databaseSizeBeforeUpdate = pickupStatusRepository.findAll().size();

        // Update the pickupStatus
        PickupStatus updatedPickupStatus = pickupStatusRepository.findById(pickupStatus.getId()).get();
        // Disconnect from session so that the updates on updatedPickupStatus are not directly saved in db
        em.detach(updatedPickupStatus);
        updatedPickupStatus
            .name(UPDATED_NAME);
        PickupStatusDTO pickupStatusDTO = pickupStatusMapper.toDto(updatedPickupStatus);

        restPickupStatusMockMvc.perform(put("/api/pickup-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pickupStatusDTO)))
            .andExpect(status().isOk());

        // Validate the PickupStatus in the database
        List<PickupStatus> pickupStatusList = pickupStatusRepository.findAll();
        assertThat(pickupStatusList).hasSize(databaseSizeBeforeUpdate);
        PickupStatus testPickupStatus = pickupStatusList.get(pickupStatusList.size() - 1);
        assertThat(testPickupStatus.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPickupStatus() throws Exception {
        int databaseSizeBeforeUpdate = pickupStatusRepository.findAll().size();

        // Create the PickupStatus
        PickupStatusDTO pickupStatusDTO = pickupStatusMapper.toDto(pickupStatus);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPickupStatusMockMvc.perform(put("/api/pickup-statuses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pickupStatusDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PickupStatus in the database
        List<PickupStatus> pickupStatusList = pickupStatusRepository.findAll();
        assertThat(pickupStatusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePickupStatus() throws Exception {
        // Initialize the database
        pickupStatusRepository.saveAndFlush(pickupStatus);

        int databaseSizeBeforeDelete = pickupStatusRepository.findAll().size();

        // Get the pickupStatus
        restPickupStatusMockMvc.perform(delete("/api/pickup-statuses/{id}", pickupStatus.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PickupStatus> pickupStatusList = pickupStatusRepository.findAll();
        assertThat(pickupStatusList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PickupStatus.class);
        PickupStatus pickupStatus1 = new PickupStatus();
        pickupStatus1.setId(1L);
        PickupStatus pickupStatus2 = new PickupStatus();
        pickupStatus2.setId(pickupStatus1.getId());
        assertThat(pickupStatus1).isEqualTo(pickupStatus2);
        pickupStatus2.setId(2L);
        assertThat(pickupStatus1).isNotEqualTo(pickupStatus2);
        pickupStatus1.setId(null);
        assertThat(pickupStatus1).isNotEqualTo(pickupStatus2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PickupStatusDTO.class);
        PickupStatusDTO pickupStatusDTO1 = new PickupStatusDTO();
        pickupStatusDTO1.setId(1L);
        PickupStatusDTO pickupStatusDTO2 = new PickupStatusDTO();
        assertThat(pickupStatusDTO1).isNotEqualTo(pickupStatusDTO2);
        pickupStatusDTO2.setId(pickupStatusDTO1.getId());
        assertThat(pickupStatusDTO1).isEqualTo(pickupStatusDTO2);
        pickupStatusDTO2.setId(2L);
        assertThat(pickupStatusDTO1).isNotEqualTo(pickupStatusDTO2);
        pickupStatusDTO1.setId(null);
        assertThat(pickupStatusDTO1).isNotEqualTo(pickupStatusDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(pickupStatusMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(pickupStatusMapper.fromId(null)).isNull();
    }
}
