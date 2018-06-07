package com.hk.test.repository;

import com.hk.test.domain.ProductGroup;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the ProductGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductGroupRepository extends JpaRepository<ProductGroup, Long> {

}
