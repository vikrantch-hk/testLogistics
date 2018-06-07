package com.hk.test.repository;

import com.hk.test.domain.CourierGroup;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the CourierGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourierGroupRepository extends JpaRepository<CourierGroup, Long> {

}
