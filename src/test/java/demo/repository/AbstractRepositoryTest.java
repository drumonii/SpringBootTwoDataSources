package demo.repository;

import demo.config.FlywayConfig;
import demo.config.PrimaryDataSourceConfig;
import demo.config.SecondaryDataSourceConfig;
import demo.properties.FlywayPrimaryProperties;
import demo.properties.FlywaySecondaryProperties;
import org.junit.runner.RunWith;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@EnableConfigurationProperties({ FlywayPrimaryProperties.class, FlywaySecondaryProperties.class })
@Import({ FlywayConfig.class, PrimaryDataSourceConfig.class, SecondaryDataSourceConfig.class })
public abstract class AbstractRepositoryTest {
}
