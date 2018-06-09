package com.hk.logistics.repository;

import com.hk.logistics.domain.ProductSourceDestinationMapping;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the ProductSourceDestinationMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSourceDestinationMappingRepository extends JpaRepository<ProductSourceDestinationMapping, Long> {

}
