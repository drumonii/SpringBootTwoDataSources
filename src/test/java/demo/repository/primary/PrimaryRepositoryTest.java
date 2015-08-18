package demo.repository.primary;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import demo.BaseSpringTestRunner;

public class PrimaryRepositoryTest extends BaseSpringTestRunner {
	
	@Autowired
	private PrimaryRepository primaryRepository;
	
	@Test
	public void findAll() {
		assertThat(primaryRepository.findAll()).isNotEmpty();
	}

}
