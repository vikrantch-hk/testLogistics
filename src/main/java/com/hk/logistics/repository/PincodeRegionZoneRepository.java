package com.hk.logistics.repository;

import com.hk.logistics.domain.PincodeRegionZone;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PincodeRegionZone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PincodeRegionZoneRepository extends JpaRepository<PincodeRegionZone, Long> {

}
