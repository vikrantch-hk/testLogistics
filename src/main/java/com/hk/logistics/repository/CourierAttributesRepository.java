package com.hk.logistics.repository;

import com.hk.logistics.domain.CourierAttributes;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the CourierAttributes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourierAttributesRepository extends JpaRepository<CourierAttributes, Long> {

}
