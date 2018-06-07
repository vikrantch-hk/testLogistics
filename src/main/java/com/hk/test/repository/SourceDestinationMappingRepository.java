package com.hk.test.repository;

import com.hk.test.domain.SourceDestinationMapping;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the SourceDestinationMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SourceDestinationMappingRepository extends JpaRepository<SourceDestinationMapping, Long> {

}
