package com.hk.logistics.repository;

import com.hk.logistics.domain.CourierAttributes;
import com.hk.logistics.domain.PincodeCourierMapping;
import com.hk.logistics.domain.SourceDestinationMapping;
import com.hk.logistics.domain.VendorWHCourierMapping;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PincodeCourierMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PincodeCourierMappingRepository extends JpaRepository<PincodeCourierMapping, Long>,JpaSpecificationExecutor<PincodeCourierMapping> {

	List<PincodeCourierMapping> findBySourceDestinationMappingInAndVendorWHCourierMappingIn(List<SourceDestinationMapping> sourceDestinationMapping,
			List<VendorWHCourierMapping> vendorWHCourierMapping);
	
	//@Query("select * from PincodeCourierMapping p where p.attributes.codAir=true and p.sourceDestinationMapping in :sourceDestinationMapping and p.vendorWHCourierMapping=:vendorWHCourierMapping")
	List<PincodeCourierMapping> findBySourceDestinationMappingAndVendorWHCourierMappingIn(List<SourceDestinationMapping> sourceDestinationMapping,
			List<VendorWHCourierMapping> vendorWHCourierMapping);
}
