package com.hk.logistics.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public Integer getEstimatedDeliveryDaysInfo(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,
			PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse, List<SourceDestinationMapping> sourceDestinationMapping,Vendor vendor) {
		List<PincodeCourierMapping> pincodeCourierMappings=getPincodeCourierMappingList(pincodeDeliveryInfoRequest,pincodeDeliveryInfoResponse,sourceDestinationMapping,
				vendor);
		if(pincodeCourierMappings!=null){
			Integer estimatedDeliveryDays=pincodeCourierService.getEstimatedDeliveryDays(pincodeCourierMappings);
			return estimatedDeliveryDays;
		}
		return null;
	}

	@Override
	public List<PincodeCourierMapping> getPincodeCourierMappingList(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,
			PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse, List<SourceDestinationMapping> sourceDestinationMapping,
			Vendor vendor){
		if(vendor!=null){
			String courierChannel=pincodeDeliveryInfoRequest.getSvApiObj().getCourierChannel();
			List<CourierChannel> courierChannels=courierChannelRepository.findByName(courierChannel);
			if(courierChannels!=null){
				List<VendorWHCourierMapping> vendorWHCourierMappings=new ArrayList<>();
				List<Warehouse> warehouses=new ArrayList<>();
				if(courierChannels.get(0).getName().equals("HK")){
					List<String> locationCodes=pincodeDeliveryInfoRequest.getSvApiObj().getLocationCodes();
					for(String locationCode:locationCodes){
						Warehouse warehouse1=warehouseRepository.findById(Long.parseLong(locationCode)).get();
						warehouses.add(warehouse1);
					}
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
	public List<PincodeCourierMapping> getPincodeCourierMappingListForCOD(
			PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse, List<SourceDestinationMapping> sourceDestinationMapping,Vendor vendor) {
		if(vendor!=null){
			String courierChannel=pincodeDeliveryInfoRequest.getSvApiObj().getCourierChannel();
			List<CourierChannel> courierChannels=courierChannelRepository.findByName(courierChannel);
			if(courierChannels!=null){
				List<VendorWHCourierMapping> vendorWHCourierMappings=vendorWHCourierMappingRepository.findByVendorAndCourierChannelInAndActive(vendor, courierChannels,true);
				if(vendorWHCourierMappings!=null){
					List<PincodeCourierMapping> pincodeCourierMappings=pincodeCourierMappingRepository.findBySourceDestinationMappingAndVendorWHCourierMappingInAndCourierAttributes(
							sourceDestinationMapping, vendorWHCourierMappings);
					if(pincodeCourierMappings!=null){
						return pincodeCourierMappings;
					}
				}
			}
		}
		return null;
	}





}
