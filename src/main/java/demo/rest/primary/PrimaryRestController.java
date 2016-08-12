package demo.rest.primary;

import demo.model.primary.PrimaryModel;
import demo.repository.primary.PrimaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.data.domain.ExampleMatcher.StringMatcher.CONTAINING;

@RestController
@RequestMapping("/${spring.data.rest.base-path}/primary")
@RepositoryRestController
public class PrimaryRestController {

	@Autowired
	private PrimaryRepository primaryRepository;

	@Autowired
	private PagedResourcesAssembler<PrimaryModel> pagedAssembler;

	@GetMapping
	public PagedResources<Resource<PrimaryModel>> getPrimary(Pageable pageable, PrimaryModel primaryModel) {
		ExampleMatcher exampleMatcher = ExampleMatcher.matching()
				.withMatcher("name", matcher -> matcher.stringMatcher(CONTAINING))
				.withIgnoreCase()
				.withIgnoreNullValues();
		Example<PrimaryModel> example = Example.of(primaryModel, exampleMatcher);
		return pagedAssembler.toResource(primaryRepository.findAll(example, pageable));
	}

}
