package com.hk.logistics.repository;

import com.hk.logistics.domain.PincodeCourierMapping;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the PincodeCourierMapping entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PincodeCourierMappingRepository extends JpaRepository<PincodeCourierMapping, Long> {

}
