package com.hk.logistics.repository;

import com.hk.logistics.domain.CourierPricingEngine;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the CourierPricingEngine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourierPricingEngineRepository extends JpaRepository<CourierPricingEngine, Long> {

}
