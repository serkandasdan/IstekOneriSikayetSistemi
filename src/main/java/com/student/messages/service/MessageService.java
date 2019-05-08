package com.student.messages.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.student.messages.model.Message;
import com.student.messages.repository.MessageRepository;

@Service
public class MessageService {

	@Autowired
	private MessageRepository messageRepository;
	
    public Message addMessage(Message message){
    	message.setTakenNumber(Long.toHexString(Double.doubleToLongBits(Math.random())).toUpperCase());
        return messageRepository.save(message);
    }
    
	public List<Message> getMessages(int status) {
		
		 return messageRepository.findByStatus(status);
	}

	public List<Message> findAllMessages() {

		 return (List<Message>) messageRepository.findAll();
	}

	public void deleteMessageById(long id) {
		
		messageRepository.deleteById(id);
	}
	
	public Message getTakenNumber(String takenNumber) {
 
		return messageRepository.findBytakenNumber(takenNumber);
	}
	
	public Message save(Message newMessage) {
		
		return messageRepository.save(newMessage);
	}


}
