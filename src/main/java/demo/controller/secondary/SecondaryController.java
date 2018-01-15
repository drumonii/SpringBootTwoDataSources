package demo.controller.secondary;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import demo.model.secondary.builder.SecondaryModelBuilder;
import demo.repository.secondary.SecondaryRepository;
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
		model.addAttribute(new SecondaryForm());
		return "secondary";
	}
	
	@PostMapping
	public String saveSecondary(@ModelAttribute @Valid SecondaryForm form, BindingResult result,
			RedirectAttributes redirectAttrs, Model model) {
		if (result.hasErrors()) {
			return "secondary";
		}
		SecondaryModel newSecondaryModel = repository.save(new SecondaryModelBuilder()
				.fromForm(form)
				.build());
		redirectAttrs.addFlashAttribute("success", newSecondaryModel);
		return "redirect:/secondary";
	}

}
