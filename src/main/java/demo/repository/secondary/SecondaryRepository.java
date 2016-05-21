package demo.repository.secondary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import demo.model.secondary.SecondaryModel;

@RepositoryRestResource(path = "secondary", collectionResourceRel = "data")
public interface SecondaryRepository extends JpaRepository<SecondaryModel, Integer> {

}
