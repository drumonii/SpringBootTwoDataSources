package demo.controller.primary;

import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

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
	public String savePrimary(@Valid PrimaryModel primaryModel, BindingResult result,
			RedirectAttributes redirectAttrs, Model model) {
		if (result.hasErrors()) {
			return "primary";
		}
		redirectAttrs.addFlashAttribute("success", repository.save(primaryModel).getName());
		return "redirect:/primary";
	}

}
