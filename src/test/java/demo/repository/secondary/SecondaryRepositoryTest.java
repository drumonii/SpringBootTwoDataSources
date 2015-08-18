package demo.repository.secondary;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import demo.BaseSpringTestRunner;

public class SecondaryRepositoryTest extends BaseSpringTestRunner {
	
	@Autowired
	private SecondaryRepository secondaryRepository;
	
	@Test
	public void findAll() {
		assertThat(secondaryRepository.findAll()).isNotEmpty();
	}

}
