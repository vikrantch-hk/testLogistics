package com.hk.logistics.repository;

import com.hk.logistics.domain.Channel;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Channel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {

}
