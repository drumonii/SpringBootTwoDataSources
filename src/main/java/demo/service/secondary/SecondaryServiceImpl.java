package demo.service.secondary;

import static demo.config.SecondaryDataSourceConfig.SECONDARY_PERSISTENCE_UNIT;
import static demo.config.SecondaryDataSourceConfig.SECONDARY_PLATFORM_TX_MANAGER;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(SECONDARY_PLATFORM_TX_MANAGER)
public class SecondaryServiceImpl implements SecondaryService {
	
	@PersistenceContext(unitName = SECONDARY_PERSISTENCE_UNIT)
	private EntityManager entityManager;

}
