package demo.config;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "PRIMARY_ENTITY_MANAGER_FACTORY", 
		transactionManagerRef = "PRIMARY_PLATFORM_TX_MANAGER", basePackages = { "demo.repository.primary" })
public class PrimaryDataSourceConfig {

	public static final String PREFIX_PRIMARY = DataSourceProperties.PREFIX + ".primary";
	public static final String PRIMARY_PERSISTENCE_UNIT = "PRIMARY_PERSISTENCE_UNIT";
	public static final String PRIMARY_ENTITY_MANAGER = "PRIMARY_ENTITY_MANAGER";
	public static final String PRIMARY_ENTITY_MANAGER_FACTORY = "PRIMARY_ENTITY_MANAGER_FACTORY";
	public static final String PRIMARY_PLATFORM_TX_MANAGER = "PRIMARY_PLATFORM_TX_MANAGER";

	@Bean(name = PREFIX_PRIMARY)
	@Primary
	@ConfigurationProperties(prefix = PREFIX_PRIMARY)
	public DataSource primaryDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean(name = PRIMARY_ENTITY_MANAGER)
	@Primary
	public EntityManager entityManager(
			@Qualifier(PRIMARY_ENTITY_MANAGER_FACTORY) EntityManagerFactory entityManagerFactory) {
		return entityManagerFactory.createEntityManager();
	}

	@Bean(name = PRIMARY_ENTITY_MANAGER_FACTORY)
	@Primary
	public LocalContainerEntityManagerFactoryBean primaryEntityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder.dataSource(primaryDataSource()).packages("demo.model.primary")
				.persistenceUnit(PRIMARY_PERSISTENCE_UNIT).build();
	}

	@Bean(name = PRIMARY_PLATFORM_TX_MANAGER)
	@Primary
	public PlatformTransactionManager secondaryPlatformTransactionManager(
			@Qualifier(PRIMARY_ENTITY_MANAGER_FACTORY) EntityManagerFactory entityManagerFactory) {
		return new JpaTransactionManager(entityManagerFactory);
	}

}
