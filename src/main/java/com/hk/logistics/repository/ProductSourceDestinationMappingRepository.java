package com.hk.logistics.repository;

import com.hk.logistics.domain.ProductSourceDestinationMapping;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductSourceDestinationMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductSourceDestinationMappingRepository extends JpaRepository<ProductSourceDestinationMapping, Long> {

}
