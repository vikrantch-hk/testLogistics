package com.hk.logistics.repository;

import com.hk.logistics.domain.CourierChannel;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the CourierChannel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourierChannelRepository extends JpaRepository<CourierChannel, Long> {
	
}
