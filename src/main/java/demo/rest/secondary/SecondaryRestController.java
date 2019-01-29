package demo.rest.secondary;

import demo.form.secondary.SecondaryForm;
import demo.model.secondary.SecondaryModel;
import demo.model.secondary.builder.SecondaryModelBuilder;
import demo.repository.secondary.SecondaryRepository;
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
@RequestMapping("/api/secondary")
public class SecondaryRestController {

	@Autowired
	private SecondaryRepository secondaryRepository;

	@GetMapping
	public Page<SecondaryModel> getSecondary(Pageable pageable, SecondaryModel secondaryModel) {
		ExampleMatcher exampleMatcher = ExampleMatcher.matching()
				.withMatcher("name", matcher -> matcher.stringMatcher(CONTAINING))
				.withIgnoreCase()
				.withIgnoreNullValues();
		Example<SecondaryModel> example = Example.of(secondaryModel, exampleMatcher);
		return secondaryRepository.findAll(example, pageable);
	}

	@PostMapping
	public ResponseEntity<SecondaryModel> savePrimary(@RequestBody @Valid SecondaryForm form, BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.badRequest().build();
		}
		SecondaryModel newSecondaryModel = secondaryRepository.save(new SecondaryModelBuilder()
				.fromForm(form)
				.build());
		return ResponseEntity.ok(newSecondaryModel);
	}

}
