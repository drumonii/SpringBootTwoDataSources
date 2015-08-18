package demo.service.primary;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import demo.BaseSpringTestRunner;

public class PrimaryServiceTest extends BaseSpringTestRunner {
	
	@Autowired
	private PrimaryService primaryService;
	
	@Test
	public void findAll() {
		assertThat(primaryService.findAll()).isNotEmpty();
	}
	
}
