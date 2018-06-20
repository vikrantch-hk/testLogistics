package com.hk.logistics.repository.search;

import com.hk.logistics.domain.ProductSourceDestinationMapping;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ProductSourceDestinationMapping entity.
 */
public interface ProductSourceDestinationMappingSearchRepository extends ElasticsearchRepository<ProductSourceDestinationMapping, Long> {
}
