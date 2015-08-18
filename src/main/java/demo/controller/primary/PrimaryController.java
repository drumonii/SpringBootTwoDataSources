package demo.controller.primary;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/primary")
public class PrimaryController {
	
	@RequestMapping(method = RequestMethod.GET)
	public String getPrimary() {
		return "primary";
	}

}
