package com.hk.logistics.repository;

import com.hk.logistics.domain.VendorWHCourierMapping;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the VendorWHCourierMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendorWHCourierMappingRepository extends JpaRepository<VendorWHCourierMapping, Long> {

}
