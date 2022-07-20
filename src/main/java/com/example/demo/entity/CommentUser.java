package com.example.demo.entity;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentUser {
//	comment DB
	private int id;
	private String comment;
	private Date updatedDate;
//	user DB
	private String user_name;

	public CommentUser(Object[] objects) {
		this((Integer) objects[0],(String) objects[1],(Date) objects[2],(String) objects[3]);
	}

}
