package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.CityCourierTAT;
import com.hk.test.repository.CityCourierTATRepository;
import com.hk.test.service.dto.CityCourierTATDTO;
import com.hk.test.service.mapper.CityCourierTATMapper;
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
 * Test class for the CityCourierTATResource REST controller.
 *
 * @see CityCourierTATResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class CityCourierTATResourceIntTest {

    private static final Long DEFAULT_TURNAROUND_TIME = 1L;
    private static final Long UPDATED_TURNAROUND_TIME = 2L;

    @Autowired
    private CityCourierTATRepository cityCourierTATRepository;


    @Autowired
    private CityCourierTATMapper cityCourierTATMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCityCourierTATMockMvc;

    private CityCourierTAT cityCourierTAT;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CityCourierTATResource cityCourierTATResource = new CityCourierTATResource(cityCourierTATRepository, cityCourierTATMapper);
        this.restCityCourierTATMockMvc = MockMvcBuilders.standaloneSetup(cityCourierTATResource)
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
    public static CityCourierTAT createEntity(EntityManager em) {
        CityCourierTAT cityCourierTAT = new CityCourierTAT()
            .turnaroundTime(DEFAULT_TURNAROUND_TIME);
        return cityCourierTAT;
    }

    @Before
    public void initTest() {
        cityCourierTAT = createEntity(em);
    }

    @Test
    @Transactional
    public void createCityCourierTAT() throws Exception {
        int databaseSizeBeforeCreate = cityCourierTATRepository.findAll().size();

        // Create the CityCourierTAT
        CityCourierTATDTO cityCourierTATDTO = cityCourierTATMapper.toDto(cityCourierTAT);
        restCityCourierTATMockMvc.perform(post("/api/city-courier-tats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cityCourierTATDTO)))
            .andExpect(status().isCreated());

        // Validate the CityCourierTAT in the database
        List<CityCourierTAT> cityCourierTATList = cityCourierTATRepository.findAll();
        assertThat(cityCourierTATList).hasSize(databaseSizeBeforeCreate + 1);
        CityCourierTAT testCityCourierTAT = cityCourierTATList.get(cityCourierTATList.size() - 1);
        assertThat(testCityCourierTAT.getTurnaroundTime()).isEqualTo(DEFAULT_TURNAROUND_TIME);
    }

    @Test
    @Transactional
    public void createCityCourierTATWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cityCourierTATRepository.findAll().size();

        // Create the CityCourierTAT with an existing ID
        cityCourierTAT.setId(1L);
        CityCourierTATDTO cityCourierTATDTO = cityCourierTATMapper.toDto(cityCourierTAT);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCityCourierTATMockMvc.perform(post("/api/city-courier-tats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cityCourierTATDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CityCourierTAT in the database
        List<CityCourierTAT> cityCourierTATList = cityCourierTATRepository.findAll();
        assertThat(cityCourierTATList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCityCourierTATS() throws Exception {
        // Initialize the database
        cityCourierTATRepository.saveAndFlush(cityCourierTAT);

        // Get all the cityCourierTATList
        restCityCourierTATMockMvc.perform(get("/api/city-courier-tats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cityCourierTAT.getId().intValue())))
            .andExpect(jsonPath("$.[*].turnaroundTime").value(hasItem(DEFAULT_TURNAROUND_TIME.intValue())));
    }
    

    @Test
    @Transactional
    public void getCityCourierTAT() throws Exception {
        // Initialize the database
        cityCourierTATRepository.saveAndFlush(cityCourierTAT);

        // Get the cityCourierTAT
        restCityCourierTATMockMvc.perform(get("/api/city-courier-tats/{id}", cityCourierTAT.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cityCourierTAT.getId().intValue()))
            .andExpect(jsonPath("$.turnaroundTime").value(DEFAULT_TURNAROUND_TIME.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCityCourierTAT() throws Exception {
        // Get the cityCourierTAT
        restCityCourierTATMockMvc.perform(get("/api/city-courier-tats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCityCourierTAT() throws Exception {
        // Initialize the database
        cityCourierTATRepository.saveAndFlush(cityCourierTAT);

        int databaseSizeBeforeUpdate = cityCourierTATRepository.findAll().size();

        // Update the cityCourierTAT
        CityCourierTAT updatedCityCourierTAT = cityCourierTATRepository.findById(cityCourierTAT.getId()).get();
        // Disconnect from session so that the updates on updatedCityCourierTAT are not directly saved in db
        em.detach(updatedCityCourierTAT);
        updatedCityCourierTAT
            .turnaroundTime(UPDATED_TURNAROUND_TIME);
        CityCourierTATDTO cityCourierTATDTO = cityCourierTATMapper.toDto(updatedCityCourierTAT);

        restCityCourierTATMockMvc.perform(put("/api/city-courier-tats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cityCourierTATDTO)))
            .andExpect(status().isOk());

        // Validate the CityCourierTAT in the database
        List<CityCourierTAT> cityCourierTATList = cityCourierTATRepository.findAll();
        assertThat(cityCourierTATList).hasSize(databaseSizeBeforeUpdate);
        CityCourierTAT testCityCourierTAT = cityCourierTATList.get(cityCourierTATList.size() - 1);
        assertThat(testCityCourierTAT.getTurnaroundTime()).isEqualTo(UPDATED_TURNAROUND_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingCityCourierTAT() throws Exception {
        int databaseSizeBeforeUpdate = cityCourierTATRepository.findAll().size();

        // Create the CityCourierTAT
        CityCourierTATDTO cityCourierTATDTO = cityCourierTATMapper.toDto(cityCourierTAT);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCityCourierTATMockMvc.perform(put("/api/city-courier-tats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cityCourierTATDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CityCourierTAT in the database
        List<CityCourierTAT> cityCourierTATList = cityCourierTATRepository.findAll();
        assertThat(cityCourierTATList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCityCourierTAT() throws Exception {
        // Initialize the database
        cityCourierTATRepository.saveAndFlush(cityCourierTAT);

        int databaseSizeBeforeDelete = cityCourierTATRepository.findAll().size();

        // Get the cityCourierTAT
        restCityCourierTATMockMvc.perform(delete("/api/city-courier-tats/{id}", cityCourierTAT.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CityCourierTAT> cityCourierTATList = cityCourierTATRepository.findAll();
        assertThat(cityCourierTATList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CityCourierTAT.class);
        CityCourierTAT cityCourierTAT1 = new CityCourierTAT();
        cityCourierTAT1.setId(1L);
        CityCourierTAT cityCourierTAT2 = new CityCourierTAT();
        cityCourierTAT2.setId(cityCourierTAT1.getId());
        assertThat(cityCourierTAT1).isEqualTo(cityCourierTAT2);
        cityCourierTAT2.setId(2L);
        assertThat(cityCourierTAT1).isNotEqualTo(cityCourierTAT2);
        cityCourierTAT1.setId(null);
        assertThat(cityCourierTAT1).isNotEqualTo(cityCourierTAT2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CityCourierTATDTO.class);
        CityCourierTATDTO cityCourierTATDTO1 = new CityCourierTATDTO();
        cityCourierTATDTO1.setId(1L);
        CityCourierTATDTO cityCourierTATDTO2 = new CityCourierTATDTO();
        assertThat(cityCourierTATDTO1).isNotEqualTo(cityCourierTATDTO2);
        cityCourierTATDTO2.setId(cityCourierTATDTO1.getId());
        assertThat(cityCourierTATDTO1).isEqualTo(cityCourierTATDTO2);
        cityCourierTATDTO2.setId(2L);
        assertThat(cityCourierTATDTO1).isNotEqualTo(cityCourierTATDTO2);
        cityCourierTATDTO1.setId(null);
        assertThat(cityCourierTATDTO1).isNotEqualTo(cityCourierTATDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(cityCourierTATMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(cityCourierTATMapper.fromId(null)).isNull();
    }
}
