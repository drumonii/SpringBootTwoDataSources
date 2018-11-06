package demo.config;

import demo.properties.FlywayPrimaryProperties;
import demo.properties.FlywaySecondaryProperties;
import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class FlywayConfig {

	@Bean(initMethod = "migrate")
	@FlywayDataSource
	@Primary
	public Flyway primaryFlyway(@Qualifier(PrimaryDataSourceConfig.PRIMARY_DATASOURCE) DataSource primaryDataSource,
			FlywayPrimaryProperties properties) {
		return Flyway.configure()
				.dataSource(primaryDataSource)
				.locations(properties.getLocation())
				.load();
	}
	
	@Bean(initMethod = "migrate")
	@FlywayDataSource
	public Flyway secondaryFlyway(@Qualifier(SecondaryDataSourceConfig.SECONDARY_DATASOURCE) DataSource secondaryDataSource,
			FlywaySecondaryProperties properties) {
		return Flyway.configure()
				.dataSource(secondaryDataSource)
				.locations(properties.getLocation())
				.load();
	}

}
