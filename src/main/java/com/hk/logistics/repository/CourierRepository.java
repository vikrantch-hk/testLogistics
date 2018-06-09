package com.hk.logistics.repository;

import com.hk.logistics.domain.Courier;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Courier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourierRepository extends JpaRepository<Courier, Long> {

    @Query(value = "select distinct courier from Courier courier left join fetch courier.courierChannels left join fetch courier.courierGroups",
        countQuery = "select count(distinct courier) from Courier courier")
    Page<Courier> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct courier from Courier courier left join fetch courier.courierChannels left join fetch courier.courierGroups")
    List<Courier> findAllWithEagerRelationships();

    @Query("select courier from Courier courier left join fetch courier.courierChannels left join fetch courier.courierGroups where courier.id =:id")
    Optional<Courier> findOneWithEagerRelationships(@Param("id") Long id);

}
