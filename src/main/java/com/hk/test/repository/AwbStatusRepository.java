package com.hk.test.repository;

import com.hk.test.domain.AwbStatus;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the AwbStatus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AwbStatusRepository extends JpaRepository<AwbStatus, Long> {

}
