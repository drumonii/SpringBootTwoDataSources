package demo.controller;

import org.springframework.boot.SpringBootVersion;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class DemoController {
	
	@RequestMapping(method = RequestMethod.GET)
	public String getHome(Model model) {
		model.addAttribute("sbVersion", SpringBootVersion.getVersion());
		return "home";
	}
	
}