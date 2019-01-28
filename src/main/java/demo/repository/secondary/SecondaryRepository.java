package demo.repository.secondary;

import org.springframework.data.jpa.repository.JpaRepository;

import demo.model.secondary.SecondaryModel;

public interface SecondaryRepository extends JpaRepository<SecondaryModel, Integer> {

	SecondaryModel findByNameIgnoreCase(String name);

}
