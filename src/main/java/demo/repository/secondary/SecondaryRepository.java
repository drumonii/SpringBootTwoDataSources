package demo.repository.secondary;

import org.springframework.data.repository.CrudRepository;

import demo.model.secondary.SecondaryModel;

public interface SecondaryRepository extends CrudRepository<SecondaryModel, Integer> {

}
