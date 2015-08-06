package demo.service.secondary;

import static demo.config.SecondaryDataSourceConfig.SECONDARY_PERSISTENCE_UNIT;
import static demo.config.SecondaryDataSourceConfig.SECONDARY_PLATFORM_TX_MANAGER;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo.model.secondary.SecondaryModel;

@Service
@Transactional(SECONDARY_PLATFORM_TX_MANAGER)
public class SecondaryServiceImpl implements SecondaryService {
	
	@PersistenceContext(unitName = SECONDARY_PERSISTENCE_UNIT)
	private EntityManager entityManager;

	@Override
	public List<SecondaryModel> findAll() {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<SecondaryModel> q = cb.createQuery(SecondaryModel.class);
		Root<SecondaryModel> c = q.from(SecondaryModel.class);
		return entityManager.createQuery(q.select(c)).getResultList();
	}

}
