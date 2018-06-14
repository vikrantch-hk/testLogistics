package com.hk.logistics.repository;

import com.hk.logistics.domain.Courier;
import com.hk.logistics.domain.CourierGroup;
import com.hk.logistics.domain.PincodeRegionZone;
import com.hk.logistics.domain.SourceDestinationMapping;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PincodeRegionZone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PincodeRegionZoneRepository extends JpaRepository<PincodeRegionZone, Long> {

	@Query("Select p from PincodeRegionZone prz where prz.sourceDestinationMapping=:sourceDestinationMapping and prz.courierGroup.couriers=:courierList")
	List<PincodeRegionZone> findBySourceDestinationMappingAndCouriers(SourceDestinationMapping sourceDestinationMapping,List<Courier> courierList);
	
}
