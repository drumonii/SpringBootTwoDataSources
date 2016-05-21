package demo.repository.primary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import demo.model.primary.PrimaryModel;

@RepositoryRestResource(path = "primary", collectionResourceRel = "data")
public interface PrimaryRepository extends JpaRepository<PrimaryModel, Integer>{

}
