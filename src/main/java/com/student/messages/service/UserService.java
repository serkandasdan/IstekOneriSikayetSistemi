package com.student.messages.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.messages.model.Message;
import com.student.messages.model.User;
import com.student.messages.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User findByNameAndPassword(String username, String password) {

		return userRepository.findByUsernameAndPassword(username, password);
	}

	public User findByPassword(String password) {

		return userRepository.findByPassword(password);
	}
	
	public User findByName(String username) {
		return userRepository.findByUsername(username);
	}

	public User save(User newUser) {
		
		return userRepository.save(newUser);
	}


}
