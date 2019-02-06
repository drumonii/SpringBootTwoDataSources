package demo.repository.primary;

import demo.repository.AbstractRepositoryTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class PrimaryRepositoryTest extends AbstractRepositoryTest {
	
	@Autowired
	private PrimaryRepository primaryRepository;

	@Test
	public void findByName() {
		assertThat(primaryRepository.findByNameIgnoreCase("Unknown")).isNull();
		assertThat(primaryRepository.findByNameIgnoreCase("ericka")).isNotNull();
	}

}
