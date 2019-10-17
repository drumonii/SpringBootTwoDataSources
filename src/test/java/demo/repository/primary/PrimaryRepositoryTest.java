package demo.repository.primary;

import demo.repository.AbstractRepositoryTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class PrimaryRepositoryTest extends AbstractRepositoryTest {
	
	@Autowired
	private PrimaryRepository primaryRepository;

	@Test
	void findByName() {
		assertThat(primaryRepository.findByNameIgnoreCase("Unknown")).isNull();
		assertThat(primaryRepository.findByNameIgnoreCase("ericka")).isNotNull();
	}

}
