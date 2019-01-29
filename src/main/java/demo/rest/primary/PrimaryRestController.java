package demo.rest.primary;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.model.primary.builder.PrimaryModelBuilder;
import demo.repository.primary.PrimaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static org.springframework.data.domain.ExampleMatcher.StringMatcher.CONTAINING;

@RestController
@RequestMapping("/api/primary")
public class PrimaryRestController {

	@Autowired
	private PrimaryRepository primaryRepository;

	@GetMapping
	public Page<PrimaryModel> getPrimary(Pageable pageable, PrimaryModel primaryModel) {
		ExampleMatcher exampleMatcher = ExampleMatcher.matching()
				.withMatcher("name", matcher -> matcher.stringMatcher(CONTAINING))
				.withIgnoreCase()
				.withIgnoreNullValues();
		Example<PrimaryModel> example = Example.of(primaryModel, exampleMatcher);
		return primaryRepository.findAll(example, pageable);
	}

	@PostMapping
	public ResponseEntity<PrimaryModel> savePrimary(@RequestBody @Valid PrimaryForm form, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.badRequest().build();
		}
		PrimaryModel newPrimaryModel = primaryRepository.save(new PrimaryModelBuilder()
				.fromForm(form)
				.build());
		return ResponseEntity.ok(newPrimaryModel);
	}

}
