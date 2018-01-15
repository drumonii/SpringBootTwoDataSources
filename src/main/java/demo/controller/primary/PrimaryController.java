package demo.controller.primary;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.model.primary.builder.PrimaryModelBuilder;
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
		model.addAttribute(new PrimaryForm());
		return "primary";
	}
	
	@PostMapping
	public String savePrimary(@ModelAttribute @Valid PrimaryForm form, BindingResult result,
			RedirectAttributes redirectAttrs, Model model) {
		if (result.hasErrors()) {
			return "primary";
		}
		PrimaryModel newPrimaryModel = repository.save(new PrimaryModelBuilder()
				.fromForm(form)
				.build());
		redirectAttrs.addFlashAttribute("success", newPrimaryModel);
		return "redirect:/primary";
	}

}
