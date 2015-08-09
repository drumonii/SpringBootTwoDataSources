package demo.config;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class FlywayConfig {

	@Autowired
	@Qualifier(PrimaryDataSourceConfig.PREFIX_PRIMARY)
	private DataSource primaryDataSource;
	
	@Autowired
	@Qualifier(SecondaryDataSourceConfig.PREFIX_SECONDARY)
	private DataSource secondaryDataSource;
	
	@Autowired
	private FlywayConfiguration flywayConfiguration;

	@Bean(initMethod = "migrate")
	@FlywayDataSource
	@Primary
	public Flyway primaryFlyway() {
		Flyway flyway = new Flyway();
		flyway.setDataSource(primaryDataSource);
		flyway.setLocations(flywayConfiguration.getPrimary().getLocation());
		return flyway;
	}
	
	@Bean(initMethod = "migrate")
	@FlywayDataSource
	public Flyway secondaryFlyway() {
		Flyway flyway = new Flyway();
		flyway.setDataSource(secondaryDataSource);
		flyway.setLocations(flywayConfiguration.getSecondary().getLocation());
		return flyway;
	}

}
