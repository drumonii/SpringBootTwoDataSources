package demo.controller.secondary;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/secondary")
public class SecondaryController {
	
	@RequestMapping(method = RequestMethod.GET)
	public String getSecondary() {
		return "secondary";
	}

}
