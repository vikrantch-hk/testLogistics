package com.hk.logistics.config.batch;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.hk.logistics.domain.Vendor;


@Component
@Scope(value=BeanDefinition.SCOPE_PROTOTYPE)
public class CustomItemReader implements ItemReader<Vendor> {

	private List<Vendor> bookNameList;
	private static ThreadLocal<AtomicInteger> bookCount = new ThreadLocal<AtomicInteger>() {
		@Override
		protected AtomicInteger initialValue() {
			return new AtomicInteger(0);
		}
	};

	
	
	@Override
	public Vendor read() throws Exception, UnexpectedInputException, ParseException {
		if (bookCount.get().intValue() < getUserNameList().size()) {
			return getUserNameList().get(bookCount.get().incrementAndGet());
		} else {
			return null;
		}
	}

	public List<Vendor> getUserNameList() {
		return bookNameList;
	}

	public void setBookNameList(List<Vendor> bookNameList) {
		this.bookNameList = bookNameList;
	}

}