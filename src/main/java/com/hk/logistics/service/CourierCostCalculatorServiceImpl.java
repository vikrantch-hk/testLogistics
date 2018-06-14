package com.hk.logistics.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hk.logistics.domain.Courier;
import com.hk.logistics.domain.CourierChannel;
import com.hk.logistics.domain.CourierPricingEngine;
import com.hk.logistics.domain.Pincode;
import com.hk.logistics.domain.PincodeCourierMapping;
import com.hk.logistics.domain.PincodeRegionZone;
import com.hk.logistics.domain.SourceDestinationMapping;
import com.hk.logistics.domain.Warehouse;
import com.hk.logistics.repository.CourierChannelRepository;
import com.hk.logistics.repository.CourierPricingEngineRepository;
import com.hk.logistics.repository.PincodeCourierMappingRepository;
import com.hk.logistics.repository.PincodeRegionZoneRepository;
import com.hk.logistics.repository.PincodeRepository;
import com.hk.logistics.repository.SourceDestinationMappingRepository;

@Service
public class CourierCostCalculatorServiceImpl implements CourierCostCalculatorService{

	private static Logger logger = LoggerFactory.getLogger(CourierCostCalculatorServiceImpl.class);
	
	@Autowired
	PincodeCourierService pincodeCourierService;
	@Autowired
	PincodeRepository pincodeRepository;
	@Autowired
	SourceDestinationMappingRepository sourceDestinationMappingRepository;
	@Autowired
	CourierChannelRepository courierChannelRepository;
	@Autowired
	PincodeCourierMappingRepository pincodeCourierMappingRepository;
	@Autowired
	PincodeRegionZoneRepository pincodeRegionZoneRepository;
	@Autowired
	CourierPricingEngineRepository courierPricingEngineRepository;

	public List<Courier> getBestAvailableCourierList(String pincode, boolean cod, Warehouse srcWarehouse, List<Courier> courierList, Double amount, Double weight,
			boolean ground, boolean isMarketPlaced, boolean cardOnDelivery, String courierChannel) {

		TreeMap<Courier, Long> courierCostingMap = getCourierCostingMap(pincode, cod, srcWarehouse, courierList, amount, weight, ground, null, true, isMarketPlaced, cardOnDelivery, courierChannel);

		Map<Courier, Long> sortedMap = courierCostingMap.descendingMap();

		List<Courier> cheapestCourierList = new ArrayList<Courier>();

		for (Map.Entry<Courier, Long> entry : sortedMap.entrySet()) {
			if (EnumCourier.Speedpost.getId().equals(entry.getKey().getId())) {
				if (courierCostingMap.size() <= 1) {
					cheapestCourierList.add(entry.getKey());
				}
			} else {
				cheapestCourierList.add(entry.getKey());
			}
		}

		return cheapestCourierList;
	}

	public TreeMap<Courier, Long> getCourierCostingMap(String pincode, boolean cod, Warehouse srcWarehouse, List<Courier> courierList, Double amount,
			Double weight, boolean ground, Date shipmentDate, boolean onlyCheapestCourierApplicable, boolean isMarketPlaced, boolean cardOnDelivery, String courierChannel) {
		Pincode pincodeObj = pincodeRepository.findByPincode(pincode);
		String sourcePincode=srcWarehouse.getPincode();
		List<String> sourcePincodes=new ArrayList<>(Arrays.asList(sourcePincode));
		List<SourceDestinationMapping> sourceDestinationMappings=sourceDestinationMappingRepository.findBySourcePincodeInAndDestinationPincode(sourcePincodes, pincode);
		List<Warehouse> warehouses=new ArrayList<>(Arrays.asList(srcWarehouse));
		List<PincodeCourierMapping> applicableCourierList = pincodeCourierService.getPincodeCourierMappingList(warehouses, courierChannel, sourceDestinationMappings, null);

		return getCourierCostingMap(pincodeObj, applicableCourierList, pincode, cod, srcWarehouse, amount, weight, ground, shipmentDate);
	}
	
	private TreeMap<Courier, Long> getCourierCostingMap(Pincode pincodeObj, List<Courier> applicableCourierList, String pincode, boolean cod, Warehouse srcWarehouse, Double amount,
            Double weight, boolean ground, Date shipmentDate) {
    	Double totalCost = 0D;

        if (pincodeObj == null || applicableCourierList == null || applicableCourierList.isEmpty()) {
            logger.error("Could not fetch applicable couriers while making courier costing map for pincode " + pincode
                    + "cod " + cod + " ground " + ground);
            return new TreeMap<Courier, Long>();
        }
        SourceDestinationMapping sourceDestinationMapping=sourceDestinationMappingRepository.findBySourcePincodeAndDestinationPincode(srcWarehouse.getPincode(),pincode);
        List<PincodeRegionZone> sortedApplicableZoneList =
                pincodeRegionZoneRepository.findBySourceDestinationMappingAndCouriers(sourceDestinationMapping,applicableCourierList);
        Map<Courier, Long> courierCostingMap = new HashMap<>();
        for (PincodeRegionZone pincodeRegionZone : sortedApplicableZoneList) {
            Set<Courier> couriers = courierGroupService.getCommonCouriers(pincodeRegionZone.getCourierGroup(),
                    applicableCourierList);
            for (Courier courier : couriers) {
                    CourierPricingEngine courierPricingInfo = courierPricingEngineRepository.getCourierPricingInfo(courier,
                            pincodeRegionZone.getRegionType(), srcWarehouse, shipmentDate);
                    if (courierPricingInfo == null) {
                        continue;
                    }
                    totalCost = shipmentPricingEngine.calculateShipmentCost(courierPricingInfo, weight);
                    if (cod) {
                        totalCost += shipmentPricingEngine.calculateReconciliationCost(courierPricingInfo, amount, cod);
                    }
                }
                logger.debug("courier " + courier.getName() + "totalCost " + totalCost);
                courierCostingMap.put(courier, Math.round(totalCost));
            }
        }

        MapValueComparator mapValueComparator = new MapValueComparator(courierCostingMap);
        TreeMap<Courier, Long> sortedCourierCostingTreeMap = new TreeMap(mapValueComparator);
        sortedCourierCostingTreeMap.putAll(courierCostingMap);

        return sortedCourierCostingTreeMap;
    }

}
