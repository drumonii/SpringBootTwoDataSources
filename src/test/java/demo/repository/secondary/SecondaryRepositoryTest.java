package demo.repository.secondary;

import demo.repository.AbstractRepositoryTest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class SecondaryRepositoryTest extends AbstractRepositoryTest {
	
	@Autowired
	private SecondaryRepository secondaryRepository;

	@Test
	void findByName() {
		assertThat(secondaryRepository.findByNameIgnoreCase("Unknown")).isNull();
		assertThat(secondaryRepository.findByNameIgnoreCase("lesa")).isNotNull();
	}

}
