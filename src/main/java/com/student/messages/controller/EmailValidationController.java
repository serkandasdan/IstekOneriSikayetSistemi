package com.student.messages.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.student.messages.mail.SmtpMailSender;
import com.student.messages.model.EmailValidation;
import com.student.messages.service.EmailValidationService;

@RestController
public class EmailValidationController {

	@Autowired
	private SmtpMailSender smtpMailSender;

	@Autowired
	private EmailValidationService emailValidationService;

	@RequestMapping(value = "/createCode", method = RequestMethod.POST)
	public EmailValidation addValidationCode(@RequestBody EmailValidation emailValidation) throws MessagingException {
		Random random = new Random();
		emailValidation.setValidateCode(random.nextInt(899999) + 100000);

		String newValidateCode;
		newValidateCode = Integer.toString(emailValidation.getValidateCode());
		smtpMailSender.send(emailValidation.getEmail(), "Fýrat Üniversitesi Ýstek Þikayet Sistemi", newValidateCode);

		return emailValidationService.addValidationCode(emailValidation);
	}

	@GetMapping("/getCreateCode/{validationCode}/{email}")
	@ResponseBody
	public EmailValidation getValidationCode(@PathVariable("validationCode") int validationCode,
			@PathVariable("email") String email, HttpServletResponse response) throws ParseException {
		EmailValidation emailValidation = emailValidationService.findByValidateCodeAndEmail(validationCode, email);

		if (emailValidation != null) {
			
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date date = new Date();
			
			String actualTimes = dateFormat.format(date);
			Date actualTime = dateFormat.parse(actualTimes);
			
			String expiryDates = dateFormat.format(emailValidation.getExpiryDate());
			Date expiryDate = dateFormat.parse(expiryDates);

			if (expiryDate.after(actualTime) || expiryDate.equals(actualTime)) {

				return emailValidation;
			}

			else if (actualTime.after(expiryDate)) {
				response.setStatus(408);
			} 
			
			else {
				response.setStatus(404);
			}
		}
		
		else {
			response.setStatus(404);
		}
		return null;
	}

}
