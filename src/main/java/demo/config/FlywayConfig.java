package demo.config;

import javax.sql.DataSource;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import demo.properties.FlywayPrimaryProperties;
import demo.properties.FlywaySecondaryProperties;

@Configuration
public class FlywayConfig {

	@Autowired
	@Qualifier(PrimaryDataSourceConfig.PRIMARY_DATASOURCE)
	private DataSource primaryDataSource;
	
	@Autowired
	@Qualifier(SecondaryDataSourceConfig.SECONDARY_DATASOURCE)
	private DataSource secondaryDataSource;

	@Bean(initMethod = "migrate")
	@FlywayDataSource
	@Primary
	public Flyway primaryFlyway(FlywayPrimaryProperties properties) {
		Flyway flyway = new Flyway();
		flyway.setDataSource(primaryDataSource);
		flyway.setLocations(properties.getLocation());
		return flyway;
	}
	
	@Bean(initMethod = "migrate")
	@FlywayDataSource
	public Flyway secondaryFlyway(FlywaySecondaryProperties properties) {
		Flyway flyway = new Flyway();
		flyway.setDataSource(secondaryDataSource);
		flyway.setLocations(properties.getLocation());
		return flyway;
	}

}
