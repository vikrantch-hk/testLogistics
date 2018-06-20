package com.hk.logistics.repository;

import com.hk.logistics.domain.CourierAttributes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CourierAttributes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourierAttributesRepository extends JpaRepository<CourierAttributes, Long> {

}
