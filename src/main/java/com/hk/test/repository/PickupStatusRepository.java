package com.hk.test.repository;

import com.hk.test.domain.PickupStatus;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PickupStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PickupStatusRepository extends JpaRepository<PickupStatus, Long> {

}
