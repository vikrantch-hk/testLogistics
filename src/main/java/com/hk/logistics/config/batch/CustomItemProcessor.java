package com.hk.logistics.config.batch;

import org.springframework.batch.item.ItemProcessor;

import com.hk.logistics.domain.Vendor;

public class CustomItemProcessor implements ItemProcessor<Vendor, Vendor> {

	 @Override
	 public Vendor process(Vendor bookNameWithoutAuthor) throws Exception {
	  return bookNameWithoutAuthor;
	 }

	}