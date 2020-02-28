package demo.repository.secondary;

import demo.repository.AbstractRepositoryTest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class SecondaryRepositoryTest extends AbstractRepositoryTest {
	
	@Autowired
	private SecondaryRepository secondaryRepository;

	@Nested
	@DisplayName("findByName")
	class FindByName {

		@ValueSource(strings = { "lesa", "Lesa", "LESA" })
		@ParameterizedTest(name = "name=''{0}''")
		void finds(String name) {
			assertThat(secondaryRepository.findByNameIgnoreCase(name)).isNotNull();
		}

		@ValueSource(strings = { "Unknown" })
		@ParameterizedTest(name = "name=''{0}''")
		void doesNotFind(String name) {
			assertThat(secondaryRepository.findByNameIgnoreCase(name)).isNull();
		}

	}

}
