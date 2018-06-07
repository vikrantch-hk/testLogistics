package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.Warehouse;
import com.hk.test.repository.WarehouseRepository;
import com.hk.test.service.dto.WarehouseDTO;
import com.hk.test.service.mapper.WarehouseMapper;
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
 * Test class for the WarehouseResource REST controller.
 *
 * @see WarehouseResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class WarehouseResourceIntTest {

    private static final String DEFAULT_TIN = "AAAAAAAAAA";
    private static final String UPDATED_TIN = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFIER = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFIER = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_PINCODE = "AAAAAAAAAA";
    private static final String UPDATED_PINCODE = "BBBBBBBBBB";

    private static final String DEFAULT_WH_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_WH_PHONE = "BBBBBBBBBB";

    private static final Long DEFAULT_WAREHOUSE_TYPE = 1L;
    private static final Long UPDATED_WAREHOUSE_TYPE = 2L;

    private static final Boolean DEFAULT_HONORING_B_2_C_ORDERS = false;
    private static final Boolean UPDATED_HONORING_B_2_C_ORDERS = true;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_PREFIX_INVOICE_GENERATION = "AAAAAAAAAA";
    private static final String UPDATED_PREFIX_INVOICE_GENERATION = "BBBBBBBBBB";

    private static final String DEFAULT_FULFILMENT_CENTER_CODE = "AAAAAAAAAA";
    private static final String UPDATED_FULFILMENT_CENTER_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STORE_DELIVERY = false;
    private static final Boolean UPDATED_STORE_DELIVERY = true;

    private static final String DEFAULT_GSTIN = "AAAAAAAAAA";
    private static final String UPDATED_GSTIN = "BBBBBBBBBB";

    @Autowired
    private WarehouseRepository warehouseRepository;


    @Autowired
    private WarehouseMapper warehouseMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWarehouseMockMvc;

    private Warehouse warehouse;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WarehouseResource warehouseResource = new WarehouseResource(warehouseRepository, warehouseMapper);
        this.restWarehouseMockMvc = MockMvcBuilders.standaloneSetup(warehouseResource)
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
    public static Warehouse createEntity(EntityManager em) {
        Warehouse warehouse = new Warehouse()
            .tin(DEFAULT_TIN)
            .identifier(DEFAULT_IDENTIFIER)
            .name(DEFAULT_NAME)
            .line1(DEFAULT_LINE_1)
            .line2(DEFAULT_LINE_2)
            .city(DEFAULT_CITY)
            .pincode(DEFAULT_PINCODE)
            .whPhone(DEFAULT_WH_PHONE)
            .warehouseType(DEFAULT_WAREHOUSE_TYPE)
            .honoringB2COrders(DEFAULT_HONORING_B_2_C_ORDERS)
            .active(DEFAULT_ACTIVE)
            .prefixInvoiceGeneration(DEFAULT_PREFIX_INVOICE_GENERATION)
            .fulfilmentCenterCode(DEFAULT_FULFILMENT_CENTER_CODE)
            .storeDelivery(DEFAULT_STORE_DELIVERY)
            .gstin(DEFAULT_GSTIN);
        return warehouse;
    }

    @Before
    public void initTest() {
        warehouse = createEntity(em);
    }

    @Test
    @Transactional
    public void createWarehouse() throws Exception {
        int databaseSizeBeforeCreate = warehouseRepository.findAll().size();

        // Create the Warehouse
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);
        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isCreated());

        // Validate the Warehouse in the database
        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeCreate + 1);
        Warehouse testWarehouse = warehouseList.get(warehouseList.size() - 1);
        assertThat(testWarehouse.getTin()).isEqualTo(DEFAULT_TIN);
        assertThat(testWarehouse.getIdentifier()).isEqualTo(DEFAULT_IDENTIFIER);
        assertThat(testWarehouse.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWarehouse.getLine1()).isEqualTo(DEFAULT_LINE_1);
        assertThat(testWarehouse.getLine2()).isEqualTo(DEFAULT_LINE_2);
        assertThat(testWarehouse.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testWarehouse.getPincode()).isEqualTo(DEFAULT_PINCODE);
        assertThat(testWarehouse.getWhPhone()).isEqualTo(DEFAULT_WH_PHONE);
        assertThat(testWarehouse.getWarehouseType()).isEqualTo(DEFAULT_WAREHOUSE_TYPE);
        assertThat(testWarehouse.isHonoringB2COrders()).isEqualTo(DEFAULT_HONORING_B_2_C_ORDERS);
        assertThat(testWarehouse.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testWarehouse.getPrefixInvoiceGeneration()).isEqualTo(DEFAULT_PREFIX_INVOICE_GENERATION);
        assertThat(testWarehouse.getFulfilmentCenterCode()).isEqualTo(DEFAULT_FULFILMENT_CENTER_CODE);
        assertThat(testWarehouse.isStoreDelivery()).isEqualTo(DEFAULT_STORE_DELIVERY);
        assertThat(testWarehouse.getGstin()).isEqualTo(DEFAULT_GSTIN);
    }

    @Test
    @Transactional
    public void createWarehouseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = warehouseRepository.findAll().size();

        // Create the Warehouse with an existing ID
        warehouse.setId(1L);
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Warehouse in the database
        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTinIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setTin(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdentifierIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setIdentifier(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setName(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setCity(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPincodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setPincode(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWarehouseTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setWarehouseType(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHonoringB2COrdersIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setHonoringB2COrders(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setActive(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrefixInvoiceGenerationIsRequired() throws Exception {
        int databaseSizeBeforeTest = warehouseRepository.findAll().size();
        // set the field null
        warehouse.setPrefixInvoiceGeneration(null);

        // Create the Warehouse, which fails.
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        restWarehouseMockMvc.perform(post("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllWarehouses() throws Exception {
        // Initialize the database
        warehouseRepository.saveAndFlush(warehouse);

        // Get all the warehouseList
        restWarehouseMockMvc.perform(get("/api/warehouses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(warehouse.getId().intValue())))
            .andExpect(jsonPath("$.[*].tin").value(hasItem(DEFAULT_TIN.toString())))
            .andExpect(jsonPath("$.[*].identifier").value(hasItem(DEFAULT_IDENTIFIER.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].line1").value(hasItem(DEFAULT_LINE_1.toString())))
            .andExpect(jsonPath("$.[*].line2").value(hasItem(DEFAULT_LINE_2.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE.toString())))
            .andExpect(jsonPath("$.[*].whPhone").value(hasItem(DEFAULT_WH_PHONE.toString())))
            .andExpect(jsonPath("$.[*].warehouseType").value(hasItem(DEFAULT_WAREHOUSE_TYPE.intValue())))
            .andExpect(jsonPath("$.[*].honoringB2COrders").value(hasItem(DEFAULT_HONORING_B_2_C_ORDERS.booleanValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].prefixInvoiceGeneration").value(hasItem(DEFAULT_PREFIX_INVOICE_GENERATION.toString())))
            .andExpect(jsonPath("$.[*].fulfilmentCenterCode").value(hasItem(DEFAULT_FULFILMENT_CENTER_CODE.toString())))
            .andExpect(jsonPath("$.[*].storeDelivery").value(hasItem(DEFAULT_STORE_DELIVERY.booleanValue())))
            .andExpect(jsonPath("$.[*].gstin").value(hasItem(DEFAULT_GSTIN.toString())));
    }
    

    @Test
    @Transactional
    public void getWarehouse() throws Exception {
        // Initialize the database
        warehouseRepository.saveAndFlush(warehouse);

        // Get the warehouse
        restWarehouseMockMvc.perform(get("/api/warehouses/{id}", warehouse.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(warehouse.getId().intValue()))
            .andExpect(jsonPath("$.tin").value(DEFAULT_TIN.toString()))
            .andExpect(jsonPath("$.identifier").value(DEFAULT_IDENTIFIER.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.line1").value(DEFAULT_LINE_1.toString()))
            .andExpect(jsonPath("$.line2").value(DEFAULT_LINE_2.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE.toString()))
            .andExpect(jsonPath("$.whPhone").value(DEFAULT_WH_PHONE.toString()))
            .andExpect(jsonPath("$.warehouseType").value(DEFAULT_WAREHOUSE_TYPE.intValue()))
            .andExpect(jsonPath("$.honoringB2COrders").value(DEFAULT_HONORING_B_2_C_ORDERS.booleanValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.prefixInvoiceGeneration").value(DEFAULT_PREFIX_INVOICE_GENERATION.toString()))
            .andExpect(jsonPath("$.fulfilmentCenterCode").value(DEFAULT_FULFILMENT_CENTER_CODE.toString()))
            .andExpect(jsonPath("$.storeDelivery").value(DEFAULT_STORE_DELIVERY.booleanValue()))
            .andExpect(jsonPath("$.gstin").value(DEFAULT_GSTIN.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWarehouse() throws Exception {
        // Get the warehouse
        restWarehouseMockMvc.perform(get("/api/warehouses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWarehouse() throws Exception {
        // Initialize the database
        warehouseRepository.saveAndFlush(warehouse);

        int databaseSizeBeforeUpdate = warehouseRepository.findAll().size();

        // Update the warehouse
        Warehouse updatedWarehouse = warehouseRepository.findById(warehouse.getId()).get();
        // Disconnect from session so that the updates on updatedWarehouse are not directly saved in db
        em.detach(updatedWarehouse);
        updatedWarehouse
            .tin(UPDATED_TIN)
            .identifier(UPDATED_IDENTIFIER)
            .name(UPDATED_NAME)
            .line1(UPDATED_LINE_1)
            .line2(UPDATED_LINE_2)
            .city(UPDATED_CITY)
            .pincode(UPDATED_PINCODE)
            .whPhone(UPDATED_WH_PHONE)
            .warehouseType(UPDATED_WAREHOUSE_TYPE)
            .honoringB2COrders(UPDATED_HONORING_B_2_C_ORDERS)
            .active(UPDATED_ACTIVE)
            .prefixInvoiceGeneration(UPDATED_PREFIX_INVOICE_GENERATION)
            .fulfilmentCenterCode(UPDATED_FULFILMENT_CENTER_CODE)
            .storeDelivery(UPDATED_STORE_DELIVERY)
            .gstin(UPDATED_GSTIN);
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(updatedWarehouse);

        restWarehouseMockMvc.perform(put("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isOk());

        // Validate the Warehouse in the database
        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeUpdate);
        Warehouse testWarehouse = warehouseList.get(warehouseList.size() - 1);
        assertThat(testWarehouse.getTin()).isEqualTo(UPDATED_TIN);
        assertThat(testWarehouse.getIdentifier()).isEqualTo(UPDATED_IDENTIFIER);
        assertThat(testWarehouse.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWarehouse.getLine1()).isEqualTo(UPDATED_LINE_1);
        assertThat(testWarehouse.getLine2()).isEqualTo(UPDATED_LINE_2);
        assertThat(testWarehouse.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testWarehouse.getPincode()).isEqualTo(UPDATED_PINCODE);
        assertThat(testWarehouse.getWhPhone()).isEqualTo(UPDATED_WH_PHONE);
        assertThat(testWarehouse.getWarehouseType()).isEqualTo(UPDATED_WAREHOUSE_TYPE);
        assertThat(testWarehouse.isHonoringB2COrders()).isEqualTo(UPDATED_HONORING_B_2_C_ORDERS);
        assertThat(testWarehouse.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testWarehouse.getPrefixInvoiceGeneration()).isEqualTo(UPDATED_PREFIX_INVOICE_GENERATION);
        assertThat(testWarehouse.getFulfilmentCenterCode()).isEqualTo(UPDATED_FULFILMENT_CENTER_CODE);
        assertThat(testWarehouse.isStoreDelivery()).isEqualTo(UPDATED_STORE_DELIVERY);
        assertThat(testWarehouse.getGstin()).isEqualTo(UPDATED_GSTIN);
    }

    @Test
    @Transactional
    public void updateNonExistingWarehouse() throws Exception {
        int databaseSizeBeforeUpdate = warehouseRepository.findAll().size();

        // Create the Warehouse
        WarehouseDTO warehouseDTO = warehouseMapper.toDto(warehouse);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWarehouseMockMvc.perform(put("/api/warehouses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Warehouse in the database
        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWarehouse() throws Exception {
        // Initialize the database
        warehouseRepository.saveAndFlush(warehouse);

        int databaseSizeBeforeDelete = warehouseRepository.findAll().size();

        // Get the warehouse
        restWarehouseMockMvc.perform(delete("/api/warehouses/{id}", warehouse.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Warehouse> warehouseList = warehouseRepository.findAll();
        assertThat(warehouseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Warehouse.class);
        Warehouse warehouse1 = new Warehouse();
        warehouse1.setId(1L);
        Warehouse warehouse2 = new Warehouse();
        warehouse2.setId(warehouse1.getId());
        assertThat(warehouse1).isEqualTo(warehouse2);
        warehouse2.setId(2L);
        assertThat(warehouse1).isNotEqualTo(warehouse2);
        warehouse1.setId(null);
        assertThat(warehouse1).isNotEqualTo(warehouse2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WarehouseDTO.class);
        WarehouseDTO warehouseDTO1 = new WarehouseDTO();
        warehouseDTO1.setId(1L);
        WarehouseDTO warehouseDTO2 = new WarehouseDTO();
        assertThat(warehouseDTO1).isNotEqualTo(warehouseDTO2);
        warehouseDTO2.setId(warehouseDTO1.getId());
        assertThat(warehouseDTO1).isEqualTo(warehouseDTO2);
        warehouseDTO2.setId(2L);
        assertThat(warehouseDTO1).isNotEqualTo(warehouseDTO2);
        warehouseDTO1.setId(null);
        assertThat(warehouseDTO1).isNotEqualTo(warehouseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(warehouseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(warehouseMapper.fromId(null)).isNull();
    }
}
