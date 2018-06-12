package com.hk.logistics.repository;

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
public interface PincodeCourierMappingRepository extends JpaRepository<PincodeCourierMapping, Long> {

	List<PincodeCourierMapping> findBySourceDestinationMappingAndVendorWHCourierMappingIn(SourceDestinationMapping sourceDestinationMapping,List<VendorWHCourierMapping> vendorWHCourierMapping);
}
