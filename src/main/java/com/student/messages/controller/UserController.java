package com.student.messages.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.student.messages.model.User;
import com.student.messages.service.UserService;

@RestController
public class UserController {


	@Autowired
	private UserService userService;
	
	@GetMapping("/admin/{username}/{password}")
	@ResponseBody
	public User getUserByName(@PathVariable("username") String username, @PathVariable("password") String password,
			HttpServletResponse response) {
		User user = userService.findByNameAndPassword(username, password);
		if (user != null) {
			return user;
		} else if (userService.findByName(username) != null) {
			response.setStatus(400);
		} else {
			response.setStatus(404);
		}
		return null;
	}
	
	
	@PutMapping("/adminChangePassword/{currentPassword}/{newPassword}")
	@ResponseBody
	public User changePassword(@PathVariable("currentPassword") String currentPassword,
			@PathVariable("newPassword") String newPassword, HttpServletResponse response) {
		
		User user = userService.findByPassword(currentPassword);
		
		if(user == null) {
			
			response.setStatus(404);
		}
		else
		{
			user.setPassword(newPassword);
			return userService.save(user);
		}
		
		return null;
	
	}
	
	
	@PutMapping("/adminChangeUsername/{currentUsername}/{newUsername}")
	@ResponseBody
	public User changeUsername(@PathVariable("currentUsername") String currentUsername,
			@PathVariable("newUsername") String newUsername, HttpServletResponse response) {
		
		User user2 = userService.findByName(currentUsername);
		
		if(user2 == null) {
			
			response.setStatus(404);
		}
		else
		{
			user2.setUsername(newUsername);
			return userService.save(user2);
		}
		
		return null;
	
	}
	
	
}
