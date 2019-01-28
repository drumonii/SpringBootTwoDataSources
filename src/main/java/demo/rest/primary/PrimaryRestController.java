package demo.rest.primary;

import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
