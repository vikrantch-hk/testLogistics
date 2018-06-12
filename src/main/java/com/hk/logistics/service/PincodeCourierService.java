package com.hk.logistics.service;

import java.util.List;

import com.hk.logistics.domain.Courier;
import com.hk.logistics.domain.CourierChannel;
import com.hk.logistics.domain.Pincode;
import com.hk.logistics.domain.Warehouse;

public interface PincodeCourierService {
	
	 Integer getEstimatedDeliveryDays(Pincode pincode, CourierChannel courierChannel, List<Warehouse> warehouseList,
			 boolean isGround, boolean isMarketPlacedVendor, List<Courier> applicableCourierList);
 

}
