package demo.repository.secondary;

import demo.config.FlywayConfig;
import demo.config.PrimaryDataSourceConfig;
import demo.config.SecondaryDataSourceConfig;
import demo.properties.FlywayPrimaryProperties;
import demo.properties.FlywaySecondaryProperties;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@EnableConfigurationProperties({ FlywayPrimaryProperties.class, FlywaySecondaryProperties.class })
@Import({ FlywayConfig.class, PrimaryDataSourceConfig.class, SecondaryDataSourceConfig.class })
public class SecondaryRepositoryTest {
	
	@Autowired
	private SecondaryRepository secondaryRepository;

	@Test
	public void findByName() {
		assertThat(secondaryRepository.findByNameIgnoreCase("Unknown")).isNull();
		assertThat(secondaryRepository.findByNameIgnoreCase("lesa")).isNotNull();
	}

}
