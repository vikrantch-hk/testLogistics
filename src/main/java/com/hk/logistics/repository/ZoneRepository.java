package com.hk.logistics.repository;

import com.hk.logistics.domain.Zone;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Zone entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {

}
