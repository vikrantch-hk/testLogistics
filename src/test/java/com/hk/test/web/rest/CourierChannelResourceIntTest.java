package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.CourierChannel;
import com.hk.test.repository.CourierChannelRepository;
import com.hk.test.service.dto.CourierChannelDTO;
import com.hk.test.service.mapper.CourierChannelMapper;
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
 * Test class for the CourierChannelResource REST controller.
 *
 * @see CourierChannelResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class CourierChannelResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CourierChannelRepository courierChannelRepository;


    @Autowired
    private CourierChannelMapper courierChannelMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCourierChannelMockMvc;

    private CourierChannel courierChannel;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CourierChannelResource courierChannelResource = new CourierChannelResource(courierChannelRepository, courierChannelMapper);
        this.restCourierChannelMockMvc = MockMvcBuilders.standaloneSetup(courierChannelResource)
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
    public static CourierChannel createEntity(EntityManager em) {
        CourierChannel courierChannel = new CourierChannel()
            .name(DEFAULT_NAME);
        return courierChannel;
    }

    @Before
    public void initTest() {
        courierChannel = createEntity(em);
    }

    @Test
    @Transactional
    public void createCourierChannel() throws Exception {
        int databaseSizeBeforeCreate = courierChannelRepository.findAll().size();

        // Create the CourierChannel
        CourierChannelDTO courierChannelDTO = courierChannelMapper.toDto(courierChannel);
        restCourierChannelMockMvc.perform(post("/api/courier-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierChannelDTO)))
            .andExpect(status().isCreated());

        // Validate the CourierChannel in the database
        List<CourierChannel> courierChannelList = courierChannelRepository.findAll();
        assertThat(courierChannelList).hasSize(databaseSizeBeforeCreate + 1);
        CourierChannel testCourierChannel = courierChannelList.get(courierChannelList.size() - 1);
        assertThat(testCourierChannel.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCourierChannelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = courierChannelRepository.findAll().size();

        // Create the CourierChannel with an existing ID
        courierChannel.setId(1L);
        CourierChannelDTO courierChannelDTO = courierChannelMapper.toDto(courierChannel);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCourierChannelMockMvc.perform(post("/api/courier-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierChannelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourierChannel in the database
        List<CourierChannel> courierChannelList = courierChannelRepository.findAll();
        assertThat(courierChannelList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCourierChannels() throws Exception {
        // Initialize the database
        courierChannelRepository.saveAndFlush(courierChannel);

        // Get all the courierChannelList
        restCourierChannelMockMvc.perform(get("/api/courier-channels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(courierChannel.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getCourierChannel() throws Exception {
        // Initialize the database
        courierChannelRepository.saveAndFlush(courierChannel);

        // Get the courierChannel
        restCourierChannelMockMvc.perform(get("/api/courier-channels/{id}", courierChannel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(courierChannel.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCourierChannel() throws Exception {
        // Get the courierChannel
        restCourierChannelMockMvc.perform(get("/api/courier-channels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCourierChannel() throws Exception {
        // Initialize the database
        courierChannelRepository.saveAndFlush(courierChannel);

        int databaseSizeBeforeUpdate = courierChannelRepository.findAll().size();

        // Update the courierChannel
        CourierChannel updatedCourierChannel = courierChannelRepository.findById(courierChannel.getId()).get();
        // Disconnect from session so that the updates on updatedCourierChannel are not directly saved in db
        em.detach(updatedCourierChannel);
        updatedCourierChannel
            .name(UPDATED_NAME);
        CourierChannelDTO courierChannelDTO = courierChannelMapper.toDto(updatedCourierChannel);

        restCourierChannelMockMvc.perform(put("/api/courier-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierChannelDTO)))
            .andExpect(status().isOk());

        // Validate the CourierChannel in the database
        List<CourierChannel> courierChannelList = courierChannelRepository.findAll();
        assertThat(courierChannelList).hasSize(databaseSizeBeforeUpdate);
        CourierChannel testCourierChannel = courierChannelList.get(courierChannelList.size() - 1);
        assertThat(testCourierChannel.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCourierChannel() throws Exception {
        int databaseSizeBeforeUpdate = courierChannelRepository.findAll().size();

        // Create the CourierChannel
        CourierChannelDTO courierChannelDTO = courierChannelMapper.toDto(courierChannel);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCourierChannelMockMvc.perform(put("/api/courier-channels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(courierChannelDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CourierChannel in the database
        List<CourierChannel> courierChannelList = courierChannelRepository.findAll();
        assertThat(courierChannelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCourierChannel() throws Exception {
        // Initialize the database
        courierChannelRepository.saveAndFlush(courierChannel);

        int databaseSizeBeforeDelete = courierChannelRepository.findAll().size();

        // Get the courierChannel
        restCourierChannelMockMvc.perform(delete("/api/courier-channels/{id}", courierChannel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CourierChannel> courierChannelList = courierChannelRepository.findAll();
        assertThat(courierChannelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourierChannel.class);
        CourierChannel courierChannel1 = new CourierChannel();
        courierChannel1.setId(1L);
        CourierChannel courierChannel2 = new CourierChannel();
        courierChannel2.setId(courierChannel1.getId());
        assertThat(courierChannel1).isEqualTo(courierChannel2);
        courierChannel2.setId(2L);
        assertThat(courierChannel1).isNotEqualTo(courierChannel2);
        courierChannel1.setId(null);
        assertThat(courierChannel1).isNotEqualTo(courierChannel2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CourierChannelDTO.class);
        CourierChannelDTO courierChannelDTO1 = new CourierChannelDTO();
        courierChannelDTO1.setId(1L);
        CourierChannelDTO courierChannelDTO2 = new CourierChannelDTO();
        assertThat(courierChannelDTO1).isNotEqualTo(courierChannelDTO2);
        courierChannelDTO2.setId(courierChannelDTO1.getId());
        assertThat(courierChannelDTO1).isEqualTo(courierChannelDTO2);
        courierChannelDTO2.setId(2L);
        assertThat(courierChannelDTO1).isNotEqualTo(courierChannelDTO2);
        courierChannelDTO1.setId(null);
        assertThat(courierChannelDTO1).isNotEqualTo(courierChannelDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(courierChannelMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(courierChannelMapper.fromId(null)).isNull();
    }
}
