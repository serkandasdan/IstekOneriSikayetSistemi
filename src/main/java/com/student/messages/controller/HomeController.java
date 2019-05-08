package com.student.messages.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

	@RequestMapping({ "/", "/isteksikayet" ,"/admin"})
	public String index() {
		return "forward:/index.html";
	}

}