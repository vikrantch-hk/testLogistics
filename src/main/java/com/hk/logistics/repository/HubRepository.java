package com.hk.logistics.repository;

import com.hk.logistics.domain.Hub;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Hub entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HubRepository extends JpaRepository<Hub, Long> {

}
