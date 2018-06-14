package com.hk.logistics.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hk.logistics.domain.CourierChannel;
import com.hk.logistics.domain.Pincode;
import com.hk.logistics.domain.PincodeCourierMapping;
import com.hk.logistics.domain.SourceDestinationMapping;
import com.hk.logistics.domain.Vendor;
import com.hk.logistics.domain.Warehouse;
import com.hk.logistics.enums.EnumShipmentServiceType;
import com.hk.logistics.repository.CourierChannelRepository;
import com.hk.logistics.repository.PincodeCourierMappingRepository;
import com.hk.logistics.repository.PincodeRepository;
import com.hk.logistics.repository.SourceDestinationMappingRepository;
import com.hk.logistics.repository.VendorRepository;
import com.hk.logistics.repository.VendorWHCourierMappingRepository;
import com.hk.logistics.repository.WarehouseRepository;
import com.hk.logistics.service.dto.CartOrderAPIObj;
import com.hk.logistics.service.dto.MessageConstants;
import com.hk.logistics.service.dto.PincodeDeliveryInfoRequest;
import com.hk.logistics.service.dto.PincodeDeliveryInfoResponse;
import com.hk.logistics.service.dto.ServiceabilityApiDTO;
import com.hk.logistics.service.dto.StoreConstants;
import com.hk.logistics.service.dto.StoreVariantAPIObj;

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
	@Autowired
	PincodeCourierService pincodeCourierService;
	@Autowired
	WarehouseRepository warehouseRepository;

	@Override
	public PincodeDeliveryInfoResponse getVariantDeliveryInfoByPincode(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest) {

		PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse=new PincodeDeliveryInfoResponse(StoreConstants.DEFAULT_STORE_ID);
		validatePincodeDeliverInfoRequest(pincodeDeliveryInfoRequest, pincodeDeliveryInfoResponse);
		if(pincodeDeliveryInfoResponse.isException()){
			return pincodeDeliveryInfoResponse;
		}
		Pincode destinationPincode=pincodeRepository.findByPincode(pincodeDeliveryInfoRequest.getDestinationPincode());
		validateDestinationPincode(pincodeDeliveryInfoResponse, destinationPincode);
		if(pincodeDeliveryInfoResponse.isException()){
			return pincodeDeliveryInfoResponse;
		}

		ServiceabilityApiDTO svapiObj=pincodeDeliveryInfoRequest.getSvApiObj();
		String sourcePincodes=svapiObj.getSourcePincodes();
		String[] values =sourcePincodes.split("\\s*,\\s*");
		List<String> sourcePincodesList=new ArrayList<String>(Arrays.asList(values));
		List<SourceDestinationMapping> sourceDestinationMapping=sourceDestinationMappingRepository.findBySourcePincodeInAndDestinationPincode(sourcePincodesList, destinationPincode.getPincode());
		Vendor vendor=vendorRepository.findByShortCode(svapiObj.getVendorShortCode());
		List<Warehouse> warehouses=new ArrayList<>();
		for(String locationCode:svapiObj.getLocationCodes()){
			Warehouse warehouse1=warehouseRepository.findById(Long.parseLong(locationCode)).get();
			warehouses.add(warehouse1);
		}
		Integer estimatedDeliveryDays=pincodeCourierService.getEstimatedDeliveryDaysInfo(pincodeDeliveryInfoResponse, sourceDestinationMapping,
				vendor,warehouses,svapiObj.getCourierChannel());

		if(estimatedDeliveryDays==null){
			pincodeDeliveryInfoResponse.addMessage(MessageConstants.COURIER_SERVICE_NOT_AVAILABLE);
			pincodeDeliveryInfoResponse.setException(true);
		}
		String shipmentServiceType=EnumShipmentServiceType.Cod_Ground.getName();
		List<PincodeCourierMapping> pincodeCourierMappings=pincodeCourierService.getPincodeCourierMappingListOnShipmentServiceType(svapiObj.getCourierChannel(),sourceDestinationMapping, vendor,shipmentServiceType);
		if(pincodeCourierMappings!=null){
			pincodeDeliveryInfoResponse.setEstmDeliveryDays(estimatedDeliveryDays);
			pincodeDeliveryInfoResponse.setCodAllowed(true);
		}
		if(svapiObj.isVendorShipping() || svapiObj.isVendorShippingCod()) {
			if (!svapiObj.isVendorShippingCod() ) {
				pincodeDeliveryInfoResponse.setCodAllowed(false);
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

	public PincodeDeliveryInfoResponse validatePincodeDeliverInfoRequest(PincodeDeliveryInfoRequest pincodeDeliveryInfoRequest,PincodeDeliveryInfoResponse pincodeDeliveryInfoResponse){
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

	private void setVariantServiceabilityDetails(StoreVariantAPIObj svObj, String courierChannel, Pincode destinationPincode, Pincode sourcePincode, String vendorCode, List<Warehouse> warehouseList, boolean isGroundShipped, boolean isMarketPlaced, boolean hkFulfilled ) {
		if (destinationPincode != null && (!hkFulfilled || (warehouseList != null && warehouseList.size() > 0))) {
			boolean shippable = false;
			List<SourceDestinationMapping> sourceDestinationMapping=sourceDestinationMappingRepository.findBySourcePincodeInAndDestinationPincode(null, destinationPincode.getPincode());
			Vendor vendor=vendorRepository.findByShortCode(svObj.getVendorShortCode());
			List<PincodeCourierMapping> pincodeCourierMappings=pincodeCourierService.getPincodeCourierMappingList(warehouseList,courierChannel,sourceDestinationMapping,vendor);
			if(pincodeCourierMappings!=null && pincodeCourierMappings.size()>0){
				shippable=true;
			}
			//checking ship-ability
			svObj.setShippable(shippable);
			// Checking cod
			boolean isCodAllowed = false;
			if(courierChannel != null) {
				String shipmentServiceType=EnumShipmentServiceType.Cod_Ground.getName();
				List<PincodeCourierMapping> pincodeCourierMappingsForCOD=pincodeCourierService.getPincodeCourierMappingListOnShipmentServiceType(courierChannel,sourceDestinationMapping, vendor,shipmentServiceType);
				if(pincodeCourierMappingsForCOD!=null && pincodeCourierMappingsForCOD.size()>0){
					isCodAllowed=true;
				}
				if(svObj.isVendorShipping()) {
					if (!svObj.isVendorShippingCod()) {
						isCodAllowed = false;
					}
				}
			}
			svObj.setCodAllowed(isCodAllowed);
			// Checking cardOnDelivery
			if (!isMarketPlaced && courierChannel != null) {
				//serviceTypeList = pincodeCourierService.getShipmentServiceType(isGroundShipped, false, false, true);

				String shipmentServiceType=EnumShipmentServiceType.CardOnDelivery_Ground.getName();
				List<PincodeCourierMapping> pincodeCourierMappingsForCardOnDelivery=pincodeCourierService.getPincodeCourierMappingListOnShipmentServiceType(courierChannel,sourceDestinationMapping, vendor,shipmentServiceType);
				if(pincodeCourierMappingsForCardOnDelivery!=null && pincodeCourierMappingsForCardOnDelivery.size()!=0)	       
					svObj.setCardOnDeliveryAllowed(true);
			}
		}
	}

}
