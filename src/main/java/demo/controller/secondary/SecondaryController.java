package demo.controller.secondary;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import demo.model.secondary.SecondaryModel;
import demo.repository.secondary.SecondaryRepository;

@Controller
@RequestMapping("/secondary")
public class SecondaryController {
	
	@Autowired
	private SecondaryRepository repository;
	
	@RequestMapping(method = RequestMethod.GET)
	public String getSecondary(Model model) {
		model.addAttribute(new SecondaryModel());
		return "secondary";
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public String saveSecondary(@Valid SecondaryModel secondaryModel, BindingResult result, Model model) {
		if (result.hasErrors()) {
			return "secondary";
		}
		repository.save(secondaryModel);
		return "redirect:/secondary";
	}

}
