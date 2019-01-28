package demo.repository.primary;

import org.springframework.data.jpa.repository.JpaRepository;

import demo.model.primary.PrimaryModel;

public interface PrimaryRepository extends JpaRepository<PrimaryModel, Integer>{

	PrimaryModel findByNameIgnoreCase(String name);

}
