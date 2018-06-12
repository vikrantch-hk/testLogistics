package com.hk.logistics.web.rest.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.hk.logistics.constants.EnumHolidayConstants;

public class DateUtils {
	
	public static Integer addHolidayGapToDays(Integer estDays) {
        Integer numDays = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        try {
            Date currentDate = sdf.parse(sdf.format(new Date()));
            Date futureDate = DateUtils.addToDate(currentDate, Calendar.HOUR_OF_DAY, estDays * 24);
            futureDate = sdf.parse(sdf.format(futureDate));
            for (EnumHolidayConstants holidayConstants : EnumHolidayConstants.values()) {
                Date holidayDate = sdf.parse(holidayConstants.getHolidayDate());
                if ((futureDate.after(holidayDate) || futureDate.equals(holidayDate)) && currentDate.before(holidayDate)) {
                    numDays += 1;
                }
            }
            return numDays;
        } catch (ParseException e) {
            e.printStackTrace();
            return numDays;
        }
    }
	
	public static Date addToDate(Date date, int type, int noOfUnits) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(type, noOfUnits);
        return calendar.getTime();
    }

}
