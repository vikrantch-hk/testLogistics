package com.hk.logistics.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.repository.VendorRepository;
import com.hk.logistics.web.rest.errors.BadRequestAlertException;
import com.hk.logistics.web.rest.util.HeaderUtil;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

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

    public VendorResource(VendorRepository vendorRepository, VendorMapper vendorMapper) {
        this.vendorRepository = vendorRepository;
        this.vendorMapper = vendorMapper;
    }
    
	@RequestMapping(value = "/upload", method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<Vendor> handleFileUpload(
            @RequestParam(value="file", required=false) MultipartFile	 file) throws URISyntaxException {
		
    	Long rowCount = 0L;
    	Vendor result = null;
    	Vendor vendorDetail = new Vendor();
    	List<Vendor> vendorBatch = new ArrayList<Vendor>();

        try {
       /* 	POIFSFileSystem fileSystem = null;      
			try {//get the excel document
				fileSystem = new POIFSFileSystem(new ByteArrayInputStream(file.getBytes()));
			}
			catch(Exception e) {
				e.printStackTrace();
				log.error("The file uploaded is not an excel file");
			}*/
			
			Workbook wb = WorkbookFactory.create(new ByteArrayInputStream(file.getBytes()));
			Sheet sheet = wb.getSheetAt (0);
			Iterator rows = sheet.rowIterator();
			
			while(rows.hasNext()){	
				Row row = (Row) rows.next();
				log.info("Row No.: " + row.getRowNum ());
				
				if(row.getRowNum() > 1) {//TODO : >1
					//HW0011 bug#1910
					rowCount = rowCount + 1;
					 
					/*countryDetail.setId(1l);*/
					//vendorDetail.setId(new Long(row.getRowNum() - 1));
					
					Iterator cells = row.cellIterator();
					while(cells.hasNext()) {
						Cell cell = (Cell) cells.next();
						CellStyle cellStyle = cell.getCellStyle();
					//	log.info("Cell No.: " + cell.getNumericCellValue());
						log.info("Cell type: " + cell.getCellTypeEnum());
						if(CellType.NUMERIC.equals(cell.getCellTypeEnum()))
							vendorDetail.setPincode(String.valueOf(cell.getNumericCellValue()));
						if(CellType.STRING.equals(cell.getCellTypeEnum()))
							vendorDetail.setShortCode(cell.getStringCellValue());
					}					
					vendorBatch.add(vendorDetail);						
				}
			}
			
			if(vendorBatch.size() > 0){
				for(Vendor vendor : vendorBatch){
					result = vendorRepository.save(vendor);
				}
				return ResponseEntity.created(new URI("/api/upload/"))
			            .headers(HeaderUtil.createEntityCreationAlert("Vendor", null))
			            .body(result);
			}else{
				throw new BadRequestAlertException("A new vendor File cannot be empty", ENTITY_NAME, "idexists");
			}
        }catch (RuntimeException | IOException e) {
            log.error("Error while uploading.", e);
            throw new BadRequestAlertException("A new vendor File cannot be empty", ENTITY_NAME, "idexists");
        } catch (InvalidFormatException e) {
            log.error("Error while uploading.", e);
            throw new BadRequestAlertException("A new vendor File cannot be empty", ENTITY_NAME, "idexists");
        }       
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
