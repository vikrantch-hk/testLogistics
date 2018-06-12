package com.hk.logistics.service.dto;

import java.util.List;

public class ServiceabilityApiDTO {

	private String productVariantId;
	private int qty;
	private Double mrp;
	private String vendorShortCode;
	private boolean vendorShipping;
	private boolean vendorShippingCod;
	private boolean groundShipped;
	private String sourcePincodes;
	private boolean hkFulfilled;
	private Boolean jit;
	private String courierChannel;//TODO add request courier channel

	private List<String> locationCodes;

	public String getProductVariantId() {
		return productVariantId;
	}

	public void setProductVariantId(String productVariantId) {
		this.productVariantId = productVariantId;
	}

	public int getQty() {
		return qty;
	}

	public void setQty(int qty) {
		this.qty = qty;
	}

	public Double getMrp() {
		return mrp;
	}

	public void setMrp(Double mrp) {
		this.mrp = mrp;
	}

	public String getVendorShortCode() {
		return vendorShortCode;
	}

	public void setVendorShortCode(String vendorShortCode) {
		this.vendorShortCode = vendorShortCode;
	}

	public boolean isGroundShipped() {
		return groundShipped;
	}

	public void setGroundShipped(boolean groundShipped) {
		this.groundShipped = groundShipped;
	}

	public String getSourcePincodes() {
		return sourcePincodes;
	}

	public void setSourcePincodes(String sourcePincodes) {
		this.sourcePincodes = sourcePincodes;
	}

	public boolean isVendorShipping() {
		return vendorShipping;
	}

	public void setVendorShipping(boolean vendorShipping) {
		this.vendorShipping = vendorShipping;
	}

	public boolean isVendorShippingCod() {
		return vendorShippingCod;
	}

	public void setVendorShippingCod(boolean vendorShippingCod) {
		this.vendorShippingCod = vendorShippingCod;
	}

	public boolean isHkFulfilled() {
		return hkFulfilled;
	}

	public void setHkFulfilled(boolean hkFulfilled) {
		this.hkFulfilled = hkFulfilled;
	}

	public List<String> getLocationCodes() {
		return locationCodes;
	}

	public void setLocationCodes(List<String> locationCodes) {
		this.locationCodes = locationCodes;
	}

	public Boolean getJit() {
		return jit;
	}

	public void setJit(Boolean jit) {
		this.jit = jit;
	}

	public String getCourierChannel() {
		return courierChannel;
	}

	public void setCourierChannel(String courierChannel) {
		this.courierChannel = courierChannel;
	}
	
	
}
