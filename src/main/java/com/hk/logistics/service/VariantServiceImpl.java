package com.hk.logistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hk.logistics.domain.CourierChannel;
import com.hk.logistics.domain.Pincode;
import com.hk.logistics.domain.PincodeCourierMapping;
import com.hk.logistics.domain.PincodeCourierMapping_;
import com.hk.logistics.domain.SourceDestinationMapping;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.domain.VendorWHCourierMapping;
import com.hk.logistics.repository.CourierChannelRepository;
import com.hk.logistics.repository.PincodeCourierMappingRepository;
import com.hk.logistics.repository.PincodeRepository;
import com.hk.logistics.repository.SourceDestinationMappingRepository;
import com.hk.logistics.repository.VendorRepository;
import com.hk.logistics.repository.VendorWHCourierMappingRepository;
import com.hk.logistics.service.dto.MessageConstants;
import com.hk.logistics.service.dto.PincodeDeliveryInfoRequest;
import com.hk.logistics.service.dto.PincodeDeliveryInfoResponse;
import com.hk.logistics.service.dto.ServiceabilityApiDTO;
import com.hk.logistics.service.dto.StoreConstants;

@Service
public class VariantServiceImpl implements VariantService{


	@Autowired
	PincodeRepository pincodeRepository;
	@Autowired
	VendorRepository vendorRepository;
	@Autowired
	CourierChannelRepository courierChannelRepository;
	@Autowired
	VendorWHCourierMappingRepository vendorWhCourierMappingRepository;
	@Autowired 
	SourceDestinationMappingRepository sourceDestinationMappingRepository;
	@Autowired
	PincodeCourierMappingRepository pincodeCourierMappingRepository;

	@Override
	public PincodeDeliveryInfoResponse getVariantDeliveryInfoByPincode(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest) {

		PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse=new PincodeDeliveryInfoResponse(StoreConstants.DEFAULT_STORE_ID);
		validate(pincodeDeliveryInfoRequest, pincodeDeliveryInfoResponse);
		if(pincodeDeliveryInfoResponse.isException()){
			return pincodeDeliveryInfoResponse;
		}
		Pincode destinationPincode=pincodeRepository.findByPincode(pincodeDeliveryInfoRequest.getDestinationPincode());
		validateDestinationPincode(pincodeDeliveryInfoResponse, destinationPincode);
		if(pincodeDeliveryInfoResponse.isException()){
			return pincodeDeliveryInfoResponse;
		}
		String sourcePincode=pincodeDeliveryInfoRequest.getSvApiObj().getSourcePincode();

		SourceDestinationMapping sourceDestinationMapping=sourceDestinationMappingRepository.findBySourcePincodeAndDestinationPincode(sourcePincode, destinationPincode.getPincode());
		Vendor vendor=vendorRepository.findByShortCode(pincodeDeliveryInfoRequest.getSvApiObj().getVendorShortCode());
		if(vendor!=null){
			CourierChannel courierChannel=courierChannelRepository.findById(vendor.getId()).get();
			if(courierChannel!=null){
				List<VendorWHCourierMapping> vendorWHCourierMappings=vendorWhCourierMappingRepository.findByVendorAndCourierChannel(vendor, courierChannel);
				if(vendorWHCourierMappings!=null){
					List<PincodeCourierMapping> pincodeCourierMappings=pincodeCourierMappingRepository.findBySourceDestinationMappingAndVendorWHCourierMappingIn(sourceDestinationMapping,vendorWHCourierMappings);
					if(pincodeCourierMappings!=null){
						return 
					}
				}
			}
		}

		return null;
	}

	public PincodeDeliveryInfoResponse validateDestinationPincode(PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse,
			Pincode destinationPincode) {
		if(destinationPincode==null){
			pincodeDeliveryInfoResponse.addMessage(MessageConstants.SERVICE_NOT_AVAILABLE_ON_PINCODE);
			pincodeDeliveryInfoResponse.setException(true);
		}
		return pincodeDeliveryInfoResponse;
	}

	public PincodeDeliveryInfoResponse validate(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse){
		if(pincodeDeliveryInfoRequest==null || pincodeDeliveryInfoRequest.getStoreId()==null ){
			pincodeDeliveryInfoResponse.addMessage(MessageConstants.REQ_PARAMETERS_INVALID);
			pincodeDeliveryInfoResponse.setException(true);
			return pincodeDeliveryInfoResponse;
		}
		//TODO : add store entity null check 
		ServiceabilityApiDTO serviceabilityApiDTO=pincodeDeliveryInfoRequest.getSvApiObj();
		if(serviceabilityApiDTO==null || serviceabilityApiDTO.getProductVariantId()==null || pincodeDeliveryInfoRequest.getDestinationPincode()==null){
			pincodeDeliveryInfoResponse.addMessage(MessageConstants.REQ_PARAMETERS_INVALID);
			pincodeDeliveryInfoResponse.setException(true);
			return pincodeDeliveryInfoResponse;
		}
		if(serviceabilityApiDTO.getCourierChannel()==null){
			pincodeDeliveryInfoResponse.addMessage(MessageConstants.COURIER_CHANNEL_NOT_AVAILABLE);
			pincodeDeliveryInfoResponse.setException(true);
			return pincodeDeliveryInfoResponse;
		}

		return pincodeDeliveryInfoResponse;

	}


}
