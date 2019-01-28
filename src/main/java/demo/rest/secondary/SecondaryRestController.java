package demo.rest.secondary;

import demo.model.secondary.SecondaryModel;
import demo.repository.secondary.SecondaryRepository;
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

}
