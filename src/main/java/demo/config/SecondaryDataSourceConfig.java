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
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "SECONDARY_ENTITY_MANAGER_FACTORY", 
		transactionManagerRef = "SECONDARY_PLATFORM_TX_MANAGER", basePackages = { "demo.repository.secondary" })
public class SecondaryDataSourceConfig {

	public static final String PREFIX_SECONDARY = DataSourceProperties.PREFIX + ".secondary";
	public static final String SECONDARY_PERSISTENCE_UNIT = "SECONDARY_PERSISTENCE_UNIT";
	public static final String SECONDARY_ENTITY_MANAGER = "SECONDARY_ENTITY_MANAGER";
	public static final String SECONDARY_ENTITY_MANAGER_FACTORY = "SECONDARY_ENTITY_MANAGER_FACTORY";
	public static final String SECONDARY_PLATFORM_TX_MANAGER = "SECONDARY_PLATFORM_TX_MANAGER";

	@Bean(name = PREFIX_SECONDARY)
	@ConfigurationProperties(prefix = PREFIX_SECONDARY)
	public DataSource secondaryDataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean(name = SECONDARY_ENTITY_MANAGER)
	public EntityManager entityManager(
			@Qualifier(SECONDARY_ENTITY_MANAGER_FACTORY) EntityManagerFactory entityManagerFactory) {
		return entityManagerFactory.createEntityManager();
	}

	@Bean(name = SECONDARY_ENTITY_MANAGER_FACTORY)
	public LocalContainerEntityManagerFactoryBean secondaryEntityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder.dataSource(secondaryDataSource()).packages("demo.model.secondary")
				.persistenceUnit(SECONDARY_PERSISTENCE_UNIT).build();
	}

	@Bean(name = SECONDARY_PLATFORM_TX_MANAGER)
	public PlatformTransactionManager primaryPlatformTransactionManager(
			@Qualifier(SECONDARY_ENTITY_MANAGER_FACTORY) EntityManagerFactory entityManagerFactory) {
		return new JpaTransactionManager(entityManagerFactory);
	}

}
