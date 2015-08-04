package demo.service.primary;

import static demo.config.PrimaryDataSourceConfig.PRIMARY_PERSISTENCE_UNIT;
import static demo.config.PrimaryDataSourceConfig.PRIMARY_PLATFORM_TX_MANAGER;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(PRIMARY_PLATFORM_TX_MANAGER)
public class PrimaryServiceImpl implements PrimaryService {
	
	@PersistenceContext(unitName = PRIMARY_PERSISTENCE_UNIT)
	private EntityManager entityManager;

}
