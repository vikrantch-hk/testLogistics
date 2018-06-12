package com.hk.logistics.service;

import java.util.List;

import com.hk.logistics.domain.Courier;
import com.hk.logistics.domain.CourierAttributes;
import com.hk.logistics.domain.CourierChannel;
import com.hk.logistics.domain.Pincode;
import com.hk.logistics.domain.PincodeCourierMapping;
import com.hk.logistics.domain.SourceDestinationMapping;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.domain.Warehouse;
import com.hk.logistics.service.dto.PincodeDeliveryInfoRequest;
import com.hk.logistics.service.dto.PincodeDeliveryInfoResponse;

public interface PincodeCourierService {
	
	 Integer getEstimatedDeliveryDays(List<PincodeCourierMapping> pincodeCourierMappings);

	Integer getEstimatedDeliveryDaysInfo(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,
			PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse, List<SourceDestinationMapping> sourceDestinationMapping,
			Vendor vendor);

	List<PincodeCourierMapping> getPincodeCourierMappingList(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,
			PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse, List<SourceDestinationMapping> sourceDestinationMapping,
			Vendor vendor);
 
	List<PincodeCourierMapping> getPincodeCourierMappingListForCOD(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,
			PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse, List<SourceDestinationMapping> sourceDestinationMapping,
			Vendor vendor);
	

}
