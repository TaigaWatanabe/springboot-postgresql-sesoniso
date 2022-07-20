package com.example.demo.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LimitedReportUser {
//	report DB
	private int id;
	private String content;
	private Date updatedDate;
	private int user_id;
//	user DB
	private String user_name;

	public LimitedReportUser(Object[] objects) {
		this((Integer) objects[0],(String) objects[1],(Date) objects[2],(Integer) objects[3],(String) objects[4]);
	}

}
