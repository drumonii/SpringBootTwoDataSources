package demo.service.primary;

import static demo.config.PrimaryDataSourceConfig.PRIMARY_PERSISTENCE_UNIT;
import static demo.config.PrimaryDataSourceConfig.PRIMARY_PLATFORM_TX_MANAGER;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import demo.model.primary.PrimaryModel;

@Service
@Transactional(PRIMARY_PLATFORM_TX_MANAGER)
public class PrimaryServiceImpl implements PrimaryService {

	@PersistenceContext(unitName = PRIMARY_PERSISTENCE_UNIT)
	private EntityManager entityManager;

	@Override
	public List<PrimaryModel> findAll() {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<PrimaryModel> q = cb.createQuery(PrimaryModel.class);
		Root<PrimaryModel> c = q.from(PrimaryModel.class);
		return entityManager.createQuery(q.select(c)).getResultList();
	}

}
