package com.hk.logistics.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import com.hk.logistics.criteria.SearchCriteria;
import com.hk.logistics.domain.CourierAttributes;
import com.hk.logistics.domain.CourierChannel;
import com.hk.logistics.domain.PincodeCourierMapping;
import com.hk.logistics.domain.SourceDestinationMapping;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.domain.VendorWHCourierMapping;
import com.hk.logistics.domain.Warehouse;
import com.hk.logistics.repository.CourierChannelRepository;
import com.hk.logistics.repository.PincodeCourierMappingRepository;
import com.hk.logistics.repository.VendorWHCourierMappingRepository;
import com.hk.logistics.repository.WarehouseRepository;
import com.hk.logistics.service.dto.MessageConstants;
import com.hk.logistics.service.dto.PincodeDeliveryInfoRequest;
import com.hk.logistics.service.dto.PincodeDeliveryInfoResponse;
import com.hk.logistics.specification.PincodeCourierSpecification;

@Service
public class PincodeCourierServiceImpl implements PincodeCourierService{

	@Autowired
	CourierChannelRepository courierChannelRepository;
	@Autowired
	VendorWHCourierMappingRepository vendorWHCourierMappingRepository;
	@Autowired
	PincodeCourierMappingRepository pincodeCourierMappingRepository;
	@Autowired
	WarehouseRepository warehouseRepository;
	@Autowired
	PincodeCourierService pincodeCourierService;

	@Override
	public Integer getEstimatedDeliveryDays(List<PincodeCourierMapping> pincodeCourierMappings) {
		Double maxDeliveryDays=0.0D;
		for(PincodeCourierMapping pincodeCourierMapping:pincodeCourierMappings){
			Double estimatedDeliveryDays = pincodeCourierMapping.getEstimatedDeliveryDays();
			maxDeliveryDays+=estimatedDeliveryDays;
		}
		if(pincodeCourierMappings.size()>0){
			return (maxDeliveryDays.intValue()/pincodeCourierMappings.size());
		}
		return null;
	}

	@Override
	public Integer getEstimatedDeliveryDaysInfo(PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse, List<SourceDestinationMapping> sourceDestinationMapping,Vendor vendor,List<Warehouse> warehouses,String courierChannel) {
		List<PincodeCourierMapping> pincodeCourierMappings=getPincodeCourierMappingList(warehouses,courierChannel,sourceDestinationMapping,
				vendor);
		if(pincodeCourierMappings!=null && pincodeCourierMappings.size()>0){
			Integer estimatedDeliveryDays=pincodeCourierService.getEstimatedDeliveryDays(pincodeCourierMappings);
			return estimatedDeliveryDays;
		}
		return null;
	}

	@Override
	public List<PincodeCourierMapping> getPincodeCourierMappingList(List<Warehouse> warehouses,String courierChannel,
			List<SourceDestinationMapping> sourceDestinationMapping,Vendor vendor){
		if(vendor!=null){
			List<CourierChannel> courierChannels=courierChannelRepository.findByName(courierChannel);
			if(courierChannels!=null){
				List<VendorWHCourierMapping> vendorWHCourierMappings=new ArrayList<>();
				if(courierChannels.get(0).getName().equals("HK")){
					vendorWHCourierMappings=vendorWHCourierMappingRepository.findByWarehouseInAndCourierChannelIn(warehouses, courierChannels);
				}
				else{
					vendorWHCourierMappings=vendorWHCourierMappingRepository.findByVendorAndCourierChannelInAndActive(vendor, courierChannels,true);
				}
				if(vendorWHCourierMappings!=null){
					List<PincodeCourierMapping> pincodeCourierMappings=pincodeCourierMappingRepository.findBySourceDestinationMappingInAndVendorWHCourierMappingIn(sourceDestinationMapping,vendorWHCourierMappings);
					return pincodeCourierMappings;
				}
			}
		}
		return null;
	}

	@Override
	public List<PincodeCourierMapping> getPincodeCourierMappingListOnShipmentServiceType(String courierChannel,List<SourceDestinationMapping> sourceDestinationMapping,Vendor vendor,String shipmentServiceType) {
		if(vendor!=null){
			List<CourierChannel> courierChannels=courierChannelRepository.findByName(courierChannel);
			if(courierChannels!=null){
				List<VendorWHCourierMapping> vendorWHCourierMappings=vendorWHCourierMappingRepository.findByVendorAndCourierChannelInAndActive(vendor, courierChannels,true);
				if(vendorWHCourierMappings!=null){
					PincodeCourierSpecification pincodeCourierSpecification1=new PincodeCourierSpecification(new SearchCriteria(shipmentServiceType,":",true));
					PincodeCourierSpecification pincodeCourierSpecification2=new PincodeCourierSpecification(new SearchCriteria("sourceDestinationMapping",":",sourceDestinationMapping));
					PincodeCourierSpecification pincodeCourierSpecification3=new PincodeCourierSpecification(new SearchCriteria("vendorWHCourierMapping",":",vendorWHCourierMappings));
					List<PincodeCourierMapping> pincodeCourierMappings=pincodeCourierMappingRepository.findAll(Specification.where(pincodeCourierSpecification1).and(pincodeCourierSpecification2).and(pincodeCourierSpecification3));
					if(pincodeCourierMappings!=null){
						return pincodeCourierMappings;
					}
				}
			}
		}
		return null;
	}





}
