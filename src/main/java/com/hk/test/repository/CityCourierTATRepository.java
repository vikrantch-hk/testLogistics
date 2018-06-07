package com.hk.test.repository;

import com.hk.test.domain.CityCourierTAT;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the CityCourierTAT entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityCourierTATRepository extends JpaRepository<CityCourierTAT, Long> {

}
