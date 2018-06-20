package com.hk.logistics.repository.search;

import com.hk.logistics.domain.CourierAttributes;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CourierAttributes entity.
 */
public interface CourierAttributesSearchRepository extends ElasticsearchRepository<CourierAttributes, Long> {
}
