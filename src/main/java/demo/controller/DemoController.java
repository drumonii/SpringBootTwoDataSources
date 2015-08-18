package demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class DemoController {
	
	@RequestMapping(method = RequestMethod.GET)
	public String getHome() {
		return "home";
	}
	
}