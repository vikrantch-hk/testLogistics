package com.hk.logistics.repository;

import com.hk.logistics.domain.State;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the State entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StateRepository extends JpaRepository<State, Long> {

}
