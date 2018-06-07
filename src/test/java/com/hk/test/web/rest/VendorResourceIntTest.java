package com.hk.test.web.rest;

import com.hk.test.TestLogisticsApp;

import com.hk.test.domain.Vendor;
import com.hk.test.repository.VendorRepository;
import com.hk.test.service.dto.VendorDTO;
import com.hk.test.service.mapper.VendorMapper;
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
 * Test class for the VendorResource REST controller.
 *
 * @see VendorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestLogisticsApp.class)
public class VendorResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SHORT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SHORT_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_TIN_NO = "AAAAAAAAAA";
    private static final String UPDATED_TIN_NO = "BBBBBBBBBB";

    private static final Integer DEFAULT_CREDIT_DAYS = 1;
    private static final Integer UPDATED_CREDIT_DAYS = 2;

    private static final LocalDate DEFAULT_CREATE_DT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_DT = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Long DEFAULT_ADDRESS_ID = 1L;
    private static final Long UPDATED_ADDRESS_ID = 2L;

    private static final Long DEFAULT_BILLING_ADDRESS_ID = 1L;
    private static final Long UPDATED_BILLING_ADDRESS_ID = 2L;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    private static final String DEFAULT_GSTIN = "AAAAAAAAAA";
    private static final String UPDATED_GSTIN = "BBBBBBBBBB";

    private static final String DEFAULT_PINCODE = "AAAAAAAAAA";
    private static final String UPDATED_PINCODE = "BBBBBBBBBB";

    @Autowired
    private VendorRepository vendorRepository;


    @Autowired
    private VendorMapper vendorMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVendorMockMvc;

    private Vendor vendor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendorResource vendorResource = new VendorResource(vendorRepository, vendorMapper);
        this.restVendorMockMvc = MockMvcBuilders.standaloneSetup(vendorResource)
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
    public static Vendor createEntity(EntityManager em) {
        Vendor vendor = new Vendor()
            .name(DEFAULT_NAME)
            .shortCode(DEFAULT_SHORT_CODE)
            .tinNo(DEFAULT_TIN_NO)
            .creditDays(DEFAULT_CREDIT_DAYS)
            .createDt(DEFAULT_CREATE_DT)
            .email(DEFAULT_EMAIL)
            .addressId(DEFAULT_ADDRESS_ID)
            .billingAddressId(DEFAULT_BILLING_ADDRESS_ID)
            .active(DEFAULT_ACTIVE)
            .gstin(DEFAULT_GSTIN)
            .pincode(DEFAULT_PINCODE);
        return vendor;
    }

    @Before
    public void initTest() {
        vendor = createEntity(em);
    }

    @Test
    @Transactional
    public void createVendor() throws Exception {
        int databaseSizeBeforeCreate = vendorRepository.findAll().size();

        // Create the Vendor
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);
        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isCreated());

        // Validate the Vendor in the database
        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeCreate + 1);
        Vendor testVendor = vendorList.get(vendorList.size() - 1);
        assertThat(testVendor.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVendor.getShortCode()).isEqualTo(DEFAULT_SHORT_CODE);
        assertThat(testVendor.getTinNo()).isEqualTo(DEFAULT_TIN_NO);
        assertThat(testVendor.getCreditDays()).isEqualTo(DEFAULT_CREDIT_DAYS);
        assertThat(testVendor.getCreateDt()).isEqualTo(DEFAULT_CREATE_DT);
        assertThat(testVendor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testVendor.getAddressId()).isEqualTo(DEFAULT_ADDRESS_ID);
        assertThat(testVendor.getBillingAddressId()).isEqualTo(DEFAULT_BILLING_ADDRESS_ID);
        assertThat(testVendor.isActive()).isEqualTo(DEFAULT_ACTIVE);
        assertThat(testVendor.getGstin()).isEqualTo(DEFAULT_GSTIN);
        assertThat(testVendor.getPincode()).isEqualTo(DEFAULT_PINCODE);
    }

    @Test
    @Transactional
    public void createVendorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendorRepository.findAll().size();

        // Create the Vendor with an existing ID
        vendor.setId(1L);
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vendor in the database
        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setName(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTinNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setTinNo(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreditDaysIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setCreditDays(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCreateDtIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setCreateDt(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setAddressId(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBillingAddressIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setBillingAddressId(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setActive(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPincodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendorRepository.findAll().size();
        // set the field null
        vendor.setPincode(null);

        // Create the Vendor, which fails.
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        restVendorMockMvc.perform(post("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVendors() throws Exception {
        // Initialize the database
        vendorRepository.saveAndFlush(vendor);

        // Get all the vendorList
        restVendorMockMvc.perform(get("/api/vendors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendor.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].shortCode").value(hasItem(DEFAULT_SHORT_CODE.toString())))
            .andExpect(jsonPath("$.[*].tinNo").value(hasItem(DEFAULT_TIN_NO.toString())))
            .andExpect(jsonPath("$.[*].creditDays").value(hasItem(DEFAULT_CREDIT_DAYS)))
            .andExpect(jsonPath("$.[*].createDt").value(hasItem(DEFAULT_CREATE_DT.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].addressId").value(hasItem(DEFAULT_ADDRESS_ID.intValue())))
            .andExpect(jsonPath("$.[*].billingAddressId").value(hasItem(DEFAULT_BILLING_ADDRESS_ID.intValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].gstin").value(hasItem(DEFAULT_GSTIN.toString())))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE.toString())));
    }
    

    @Test
    @Transactional
    public void getVendor() throws Exception {
        // Initialize the database
        vendorRepository.saveAndFlush(vendor);

        // Get the vendor
        restVendorMockMvc.perform(get("/api/vendors/{id}", vendor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vendor.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.shortCode").value(DEFAULT_SHORT_CODE.toString()))
            .andExpect(jsonPath("$.tinNo").value(DEFAULT_TIN_NO.toString()))
            .andExpect(jsonPath("$.creditDays").value(DEFAULT_CREDIT_DAYS))
            .andExpect(jsonPath("$.createDt").value(DEFAULT_CREATE_DT.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.addressId").value(DEFAULT_ADDRESS_ID.intValue()))
            .andExpect(jsonPath("$.billingAddressId").value(DEFAULT_BILLING_ADDRESS_ID.intValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.gstin").value(DEFAULT_GSTIN.toString()))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingVendor() throws Exception {
        // Get the vendor
        restVendorMockMvc.perform(get("/api/vendors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVendor() throws Exception {
        // Initialize the database
        vendorRepository.saveAndFlush(vendor);

        int databaseSizeBeforeUpdate = vendorRepository.findAll().size();

        // Update the vendor
        Vendor updatedVendor = vendorRepository.findById(vendor.getId()).get();
        // Disconnect from session so that the updates on updatedVendor are not directly saved in db
        em.detach(updatedVendor);
        updatedVendor
            .name(UPDATED_NAME)
            .shortCode(UPDATED_SHORT_CODE)
            .tinNo(UPDATED_TIN_NO)
            .creditDays(UPDATED_CREDIT_DAYS)
            .createDt(UPDATED_CREATE_DT)
            .email(UPDATED_EMAIL)
            .addressId(UPDATED_ADDRESS_ID)
            .billingAddressId(UPDATED_BILLING_ADDRESS_ID)
            .active(UPDATED_ACTIVE)
            .gstin(UPDATED_GSTIN)
            .pincode(UPDATED_PINCODE);
        VendorDTO vendorDTO = vendorMapper.toDto(updatedVendor);

        restVendorMockMvc.perform(put("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isOk());

        // Validate the Vendor in the database
        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeUpdate);
        Vendor testVendor = vendorList.get(vendorList.size() - 1);
        assertThat(testVendor.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVendor.getShortCode()).isEqualTo(UPDATED_SHORT_CODE);
        assertThat(testVendor.getTinNo()).isEqualTo(UPDATED_TIN_NO);
        assertThat(testVendor.getCreditDays()).isEqualTo(UPDATED_CREDIT_DAYS);
        assertThat(testVendor.getCreateDt()).isEqualTo(UPDATED_CREATE_DT);
        assertThat(testVendor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testVendor.getAddressId()).isEqualTo(UPDATED_ADDRESS_ID);
        assertThat(testVendor.getBillingAddressId()).isEqualTo(UPDATED_BILLING_ADDRESS_ID);
        assertThat(testVendor.isActive()).isEqualTo(UPDATED_ACTIVE);
        assertThat(testVendor.getGstin()).isEqualTo(UPDATED_GSTIN);
        assertThat(testVendor.getPincode()).isEqualTo(UPDATED_PINCODE);
    }

    @Test
    @Transactional
    public void updateNonExistingVendor() throws Exception {
        int databaseSizeBeforeUpdate = vendorRepository.findAll().size();

        // Create the Vendor
        VendorDTO vendorDTO = vendorMapper.toDto(vendor);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVendorMockMvc.perform(put("/api/vendors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendorDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vendor in the database
        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVendor() throws Exception {
        // Initialize the database
        vendorRepository.saveAndFlush(vendor);

        int databaseSizeBeforeDelete = vendorRepository.findAll().size();

        // Get the vendor
        restVendorMockMvc.perform(delete("/api/vendors/{id}", vendor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vendor> vendorList = vendorRepository.findAll();
        assertThat(vendorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vendor.class);
        Vendor vendor1 = new Vendor();
        vendor1.setId(1L);
        Vendor vendor2 = new Vendor();
        vendor2.setId(vendor1.getId());
        assertThat(vendor1).isEqualTo(vendor2);
        vendor2.setId(2L);
        assertThat(vendor1).isNotEqualTo(vendor2);
        vendor1.setId(null);
        assertThat(vendor1).isNotEqualTo(vendor2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VendorDTO.class);
        VendorDTO vendorDTO1 = new VendorDTO();
        vendorDTO1.setId(1L);
        VendorDTO vendorDTO2 = new VendorDTO();
        assertThat(vendorDTO1).isNotEqualTo(vendorDTO2);
        vendorDTO2.setId(vendorDTO1.getId());
        assertThat(vendorDTO1).isEqualTo(vendorDTO2);
        vendorDTO2.setId(2L);
        assertThat(vendorDTO1).isNotEqualTo(vendorDTO2);
        vendorDTO1.setId(null);
        assertThat(vendorDTO1).isNotEqualTo(vendorDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(vendorMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(vendorMapper.fromId(null)).isNull();
    }
}
