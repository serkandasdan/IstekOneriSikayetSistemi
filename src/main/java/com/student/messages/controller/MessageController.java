package com.student.messages.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.student.messages.model.Message;
import com.student.messages.service.MessageService;

@RestController
public class MessageController {

	
	@Autowired
	private MessageService messageService;
	
	
	@GetMapping("/message/{status}")
	public List<Message> getMessages(@PathVariable("status") int status) {

		return messageService.getMessages(status);
	}

	@GetMapping("/message")
	@ResponseBody
	public List<Message> getAllMessages() {
		return messageService.findAllMessages();
	}
	
	@RequestMapping(value = "/message", method = RequestMethod.POST)
	public Message addMessage(@RequestBody Message message) {

		DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date date = new Date();
		message.setCreateDate(sdf.format(date).toString());
		
		return messageService.addMessage(message);
	}
	
	
	
	@PutMapping("/message/{takenNumber}/{status}")
	@ResponseBody
	public Message updateMessageByStatus(@PathVariable("takenNumber") String takenNumber,
			@PathVariable("status") int status,@Valid @RequestBody Message message) {
		
		
		Message newMessage = messageService.getTakenNumber(takenNumber);
	
		newMessage.setStatus(status);
		return messageService.save(newMessage);
	}

	

	@DeleteMapping("/message/{id}")
	@ResponseBody
	@ResponseStatus(code = HttpStatus.OK)
	public ResponseEntity<?> deleteMessageById(@PathVariable("id") long id) {
		messageService.deleteMessageById(id);
		return ResponseEntity.ok(null);
	}




}
