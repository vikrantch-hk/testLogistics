package com.hk.logistics.repository;

import com.hk.logistics.domain.Awb;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Awb entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AwbRepository extends JpaRepository<Awb, Long> {

}
