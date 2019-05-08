package com.student.messages.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.messages.model.EmailValidation;
import com.student.messages.repository.EmailValidationRepository;

@Service
public class EmailValidationService {

	@Autowired
	private EmailValidationRepository emailValidationRepository;

    public EmailValidation addValidationCode(EmailValidation emailValidation){
    	
        return emailValidationRepository.save(emailValidation);
    }
    
	public EmailValidation findByValidateCodeAndEmail(int validateCode, String email) {

		return emailValidationRepository.findByValidateCodeAndEmail(validateCode, email);
	}
	
}
