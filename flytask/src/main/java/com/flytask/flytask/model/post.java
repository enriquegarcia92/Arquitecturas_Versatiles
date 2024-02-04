package com.flytask.flytask.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class post {
	@Id
	@GeneratedValue
	private Integer id;
	private String title;
	private String body;
	
	
	public post() {
	}
	
	public post(String title, String body) {
		this.title = title;
		this.body = body;
	}


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	
	
}
