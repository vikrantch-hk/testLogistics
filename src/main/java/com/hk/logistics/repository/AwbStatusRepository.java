package com.hk.logistics.repository;

import com.hk.logistics.domain.AwbStatus;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the AwbStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AwbStatusRepository extends JpaRepository<AwbStatus, Long> {

}
