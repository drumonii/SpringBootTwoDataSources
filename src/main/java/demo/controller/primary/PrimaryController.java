package demo.controller.primary;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;

@Controller
@RequestMapping("/primary")
public class PrimaryController {
	
	@Autowired
	private PrimaryRepository repository;

	@ModelAttribute("activeTab")
	public String activeTab() {
		return "primary";
	}
	
	@GetMapping
	public String getPrimary(Model model) {
		model.addAttribute(new PrimaryModel());
		return "primary";
	}
	
	@PostMapping
	public String savePrimary(@Valid PrimaryModel primaryModel, BindingResult result, Model model) {
		if (result.hasErrors()) {
			return "primary";
		}
		repository.save(primaryModel);
		return "redirect:/primary";
	}

}
