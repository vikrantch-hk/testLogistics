package com.hk.logistics.repository;

import com.hk.logistics.domain.Pincode;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Pincode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PincodeRepository extends JpaRepository<Pincode, Long> {

}
