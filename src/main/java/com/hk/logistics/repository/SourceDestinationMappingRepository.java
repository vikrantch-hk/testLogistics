package com.hk.logistics.repository;

import com.hk.logistics.domain.Pincode;
import com.hk.logistics.domain.SourceDestinationMapping;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the SourceDestinationMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SourceDestinationMappingRepository extends JpaRepository<SourceDestinationMapping, Long> {

	SourceDestinationMapping findBySourcePincodeAndDestinationPincode(String sourcePincode,String destinationPincode);
}
