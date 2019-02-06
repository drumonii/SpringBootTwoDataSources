package demo.rest.primary;

import demo.form.primary.PrimaryForm;
import demo.model.primary.PrimaryModel;
import demo.model.primary.builder.PrimaryModelBuilder;
import demo.repository.primary.PrimaryRepository;
import demo.rest.validation.ValidationResponse;
import demo.rest.validation.builder.ValidationResponseWithErrorsBuilder;
import demo.rest.validation.builder.ValidationResponseWithoutErrorsBuilder;
import org.springframework.context.MessageSource;
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

	private final PrimaryRepository primaryRepository;
	private final MessageSource messageSource;

	public PrimaryRestController(PrimaryRepository primaryRepository, MessageSource messageSource) {
		this.primaryRepository = primaryRepository;
		this.messageSource = messageSource;
	}

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
	public ResponseEntity<ValidationResponse<PrimaryModel>> savePrimary(@RequestBody @Valid PrimaryForm form,
			BindingResult result) {
		if (result.hasErrors()) {
			return ResponseEntity.ok(new ValidationResponseWithErrorsBuilder<PrimaryModel>(messageSource)
					.fromBindingResult(result)
					.build());
		}

		PrimaryModel newPrimaryModel = primaryRepository.save(new PrimaryModelBuilder()
				.fromForm(form)
				.build());

		return ResponseEntity.ok(new ValidationResponseWithoutErrorsBuilder<PrimaryModel>()
				.withData(newPrimaryModel)
				.build());
	}

}
