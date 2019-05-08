package com.student.messages.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.student.messages.model.Message;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {	
	
	List<Message> findByStatus(int status);
	Message findBytakenNumber(String takenNumber);
}
