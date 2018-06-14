package com.hk.logistics.repository;

import com.hk.logistics.domain.Vendor;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Vendor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {

}
