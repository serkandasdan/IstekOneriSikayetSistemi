package com.student.messages.model;

import java.util.Calendar;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity
public class EmailValidation {
	
	@Transient
	private final int EXPIRY_DATE = 5*60;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int validateCode;
	@Temporal(TemporalType.TIMESTAMP)
	private Date expiryDate;
	
	private String email;
	
	public EmailValidation() {
		this.expiryDate = calculateExpiryDate(EXPIRY_DATE);
	}
	
	private Date calculateExpiryDate(int EXPIRY_DATE) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(new Date().getTime());
		calendar.add(Calendar.SECOND, EXPIRY_DATE);
		return new Date(calendar.getTime().getTime());
	}
	
	

	public int getEXPIRY_DATE() {
		return EXPIRY_DATE;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getValidateCode() {
		return validateCode;
	}
	public void setValidateCode(int validateCode) {
		this.validateCode = validateCode;
	}
	
	
	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "EmailValidation [id=" + id + ", validateCode=" + validateCode + ", email=" + email + "]";
	}
	
	
}
