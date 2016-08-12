package demo.controller.secondary;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import demo.model.secondary.SecondaryModel;
import demo.repository.secondary.SecondaryRepository;

@Controller
@RequestMapping("/secondary")
public class SecondaryController {
	
	@Autowired
	private SecondaryRepository repository;

	@ModelAttribute("activeTab")
	public String activeTab() {
		return "secondary";
	}
	
	@GetMapping
	public String getSecondary(Model model) {
		model.addAttribute(new SecondaryModel());
		return "secondary";
	}
	
	@PostMapping
	public String saveSecondary(@Valid SecondaryModel secondaryModel, BindingResult result, Model model) {
		if (result.hasErrors()) {
			return "secondary";
		}
		repository.save(secondaryModel);
		return "redirect:/secondary";
	}

}
