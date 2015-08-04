package demo.repository.primary;

import org.springframework.data.repository.CrudRepository;

import demo.model.primary.PrimaryModel;

public interface PrimaryRepository extends CrudRepository<PrimaryModel, Integer>{

}
