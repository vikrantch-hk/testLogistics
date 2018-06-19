package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.config.batch.BatchConfiguration;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.repository.VendorRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
import com.poiji.bind.Poiji;
import com.poiji.exception.PoijiExcelType;
import com.hk.logistics.service.dto.VendorDTO;
import com.hk.logistics.service.mapper.VendorMapper;
import io.github.jhipster.web.util.ResponseUtil;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.Valid;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

/**
 * REST controller for managing Vendor.
 */
@RestController
@RequestMapping("/api")
public class VendorResource {

    private final Logger log = LoggerFactory.getLogger(VendorResource.class);

    private static final String ENTITY_NAME = "vendor";

    private final VendorRepository vendorRepository;

    private final VendorMapper vendorMapper;
    
    private int batchSize = 100;
    
    @Autowired
    JobLauncher jobLauncher;
    
    @Autowired
    BatchConfiguration batchConfiguration;
    
    @Autowired
    Job job;
    
    @PersistenceContext
    private EntityManager em;

    public VendorResource(VendorRepository vendorRepository, VendorMapper vendorMapper) {
        this.vendorRepository = vendorRepository;
        this.vendorMapper = vendorMapper;
    }
    
	@RequestMapping(value = "/upload", method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<Vendor> handleFileUpload(
            @RequestParam(value="file", required=false) MultipartFile	 file) throws URISyntaxException, InterruptedException, ExecutionException {
    	Vendor result = null;
        try {
        	List<Vendor> vendorList = Poiji.fromExcel(new ByteArrayInputStream(file.getBytes()), PoijiExcelType.XLSX, Vendor.class);
        	/*try {
				jobLauncher.run(job, new JobParameters());
			} catch (JobExecutionAlreadyRunningException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JobRestartException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JobInstanceAlreadyCompleteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (JobParametersInvalidException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}*/
        	
        	
        	Future<List<Vendor>> savedEntities;
        	
        	
			if(vendorList.size() > 0){
				
				savedEntities = bulkSave(vendorList);
				return ResponseEntity.created(new URI("/api/upload/"))
			            .headers(HeaderUtil.createEntityCreationAlert("Vendor", null))
			            .body(result);
				
			}else{
				throw new BadRequestAlertException("A new vendor File cannot be empty", ENTITY_NAME, "idexists");
			}
        }catch (RuntimeException | IOException e) {
            log.error("Error while uploading.", e);
            throw new BadRequestAlertException("A new vendor File cannot be empty", ENTITY_NAME, "idexists");
        }       
    }
	
	@Async
	public Future<List<Vendor>> bulkSave(List<Vendor> entities) {
        int size = entities.size();
        List<Vendor> savedEntities = new ArrayList<>(size);
        try {
            for (int i = 0; i < size; i += batchSize) {
                int toIndex = i + (((i + batchSize) < size) ? batchSize : size - i);
                savedEntities.addAll(processBatch(entities.subList(i, toIndex)));
                
            }
        } catch (Exception ignored) {
            // or do something...  
        }
        
        if(savedEntities.size()!=entities.size())
		{
			log.error("few entities are not saved");
		}
        else
        {
        	log.debug("entities are saved");
        }
        
        return new AsyncResult<List<Vendor>>(savedEntities);
    }
	
	
	@Transactional
    protected List<Vendor> processBatch(List<Vendor> batch) {
        List<Vendor> list = vendorRepository.saveAll(batch);
        //em.flush();
        //em.clear();
        return list;
    }
    

    /**
     * POST  /vendors : Create a new vendor.
     *
     * @param vendorDTO the vendorDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vendorDTO, or with status 400 (Bad Request) if the vendor has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendors")
    @Timed
    public ResponseEntity<VendorDTO> createVendor(@Valid @RequestBody VendorDTO vendorDTO) throws URISyntaxException {
        log.debug("REST request to save Vendor : {}", vendorDTO);
        if (vendorDTO.getId() != null) {
            throw new BadRequestAlertException("A new vendor cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        Vendor vendor = vendorMapper.toEntity(vendorDTO);
        vendor = vendorRepository.save(vendor);
        VendorDTO result = vendorMapper.toDto(vendor);
        return ResponseEntity.created(new URI("/api/vendors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendors : Updates an existing vendor.
     *
     * @param vendorDTO the vendorDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vendorDTO,
     * or with status 400 (Bad Request) if the vendorDTO is not valid,
     * or with status 500 (Internal Server Error) if the vendorDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendors")
    @Timed
    public ResponseEntity<VendorDTO> updateVendor(@Valid @RequestBody VendorDTO vendorDTO) throws URISyntaxException {
        log.debug("REST request to update Vendor : {}", vendorDTO);
        if (vendorDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        Vendor vendor = vendorMapper.toEntity(vendorDTO);
        vendor = vendorRepository.save(vendor);
        VendorDTO result = vendorMapper.toDto(vendor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vendorDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendors : get all the vendors.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vendors in body
     */
    @GetMapping("/vendors")
    @Timed
    public List<VendorDTO> getAllVendors() {
        log.debug("REST request to get all Vendors");
        List<Vendor> vendors = vendorRepository.findAll();
        return vendorMapper.toDto(vendors);
    }

    /**
     * GET  /vendors/:id : get the "id" vendor.
     *
     * @param id the id of the vendorDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vendorDTO, or with status 404 (Not Found)
     */
    @GetMapping("/vendors/{id}")
    @Timed
    public ResponseEntity<VendorDTO> getVendor(@PathVariable Long id) {
        log.debug("REST request to get Vendor : {}", id);
        Optional<VendorDTO> vendorDTO = vendorRepository.findById(id)
            .map(vendorMapper::toDto);
        return ResponseUtil.wrapOrNotFound(vendorDTO);
    }

    /**
     * DELETE  /vendors/:id : delete the "id" vendor.
     *
     * @param id the id of the vendorDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendors/{id}")
    @Timed
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        log.debug("REST request to delete Vendor : {}", id);
        vendorRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
