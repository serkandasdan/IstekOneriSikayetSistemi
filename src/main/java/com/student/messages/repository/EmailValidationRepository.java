package com.student.messages.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.student.messages.model.EmailValidation;

@Repository
public interface EmailValidationRepository extends CrudRepository<EmailValidation, Long> {


	EmailValidation findByValidateCodeAndEmail(int validateCode,String email);
}
