package demo.controller.primary;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;

@Controller
@RequestMapping("/primary")
public class PrimaryController {
	
	@Autowired
	private PrimaryRepository repository;
	
	@RequestMapping(method = RequestMethod.GET)
	public String getPrimary(Model model) {
		model.addAttribute(new PrimaryModel());
		model.addAttribute("activeTab", "primary");
		return "primary";
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public String savePrimary(@Valid PrimaryModel primaryModel, BindingResult result, Model model) {
		if (result.hasErrors()) {
			return "primary";
		}
		repository.save(primaryModel);
		return "redirect:/primary";
	}

}
