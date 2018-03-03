package demo.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(entityManagerFactoryRef = "SECONDARY_ENTITY_MANAGER_FACTORY",
		transactionManagerRef = "SECONDARY_PLATFORM_TX_MANAGER", basePackages = { "demo.repository.secondary" })
public class SecondaryDataSourceConfig {

	public static final String SECONDARY_JPA_PROPS = "secondary.jpa";
	public static final String SECONDARY_DATASOURCE = "secondary.datasource";
	public static final String SECONDARY_PERSISTENCE_UNIT = "SECONDARY_PERSISTENCE_UNIT";
	public static final String SECONDARY_ENTITY_MANAGER = "SECONDARY_ENTITY_MANAGER";
	public static final String SECONDARY_ENTITY_MANAGER_FACTORY = "SECONDARY_ENTITY_MANAGER_FACTORY";
	public static final String SECONDARY_PLATFORM_TX_MANAGER = "SECONDARY_PLATFORM_TX_MANAGER";

	@Bean(name = SECONDARY_JPA_PROPS)
	@ConfigurationProperties(SECONDARY_JPA_PROPS)
	public JpaProperties secondaryJpaProperties() {
		return new JpaProperties();
	}

	@Bean
	@ConfigurationProperties(prefix = SECONDARY_DATASOURCE)
	public DataSourceProperties secondaryDataSourceProperties() {
		return new DataSourceProperties();
	}

	@Bean(name = SECONDARY_DATASOURCE)
	@ConfigurationProperties(prefix = SECONDARY_DATASOURCE)
	public DataSource secondaryDataSource() {
		return secondaryDataSourceProperties().initializeDataSourceBuilder().build();
	}

	@Bean(name = SECONDARY_ENTITY_MANAGER)
	public EntityManager secondaryEntityManager(@Qualifier(SECONDARY_ENTITY_MANAGER_FACTORY) EntityManagerFactory 
			entityManagerFactory) {
		return entityManagerFactory.createEntityManager();
	}

	@Bean(name = SECONDARY_ENTITY_MANAGER_FACTORY)
	public LocalContainerEntityManagerFactoryBean secondaryEntityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder
				.dataSource(secondaryDataSource())
				.packages("demo.model.secondary")
				.persistenceUnit(SECONDARY_PERSISTENCE_UNIT)
				.properties(secondaryJpaProperties().getProperties())
				.build();
	}

	@Bean(name = SECONDARY_PLATFORM_TX_MANAGER)
	public PlatformTransactionManager secondaryPlatformTransactionManager(@Qualifier(SECONDARY_ENTITY_MANAGER_FACTORY) 
			EntityManagerFactory entityManagerFactory) {
		return new JpaTransactionManager(entityManagerFactory);
	}

}
