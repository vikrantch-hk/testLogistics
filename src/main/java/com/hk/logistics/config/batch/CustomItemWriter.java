package com.hk.logistics.config.batch;

import java.util.List;

import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import com.hk.logistics.domain.Vendor;
@Component
public class CustomItemWriter implements ItemWriter<Vendor> {

	 @Override
	 public void write(List<? extends Vendor> bookNameWithAuthor) throws Exception {
	  System.out.println(bookNameWithAuthor);
	 }

	}