package demo.config;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "flyway")
public class FlywayConfiguration {
	
	@NotNull
	@Valid
	private Primary primary;
	
	public Primary getPrimary() {
		return primary;
	}

	public void setPrimary(Primary primary) {
		this.primary = primary;
	}

	public Secondary getSecondary() {
		return secondary;
	}

	public void setSecondary(Secondary secondary) {
		this.secondary = secondary;
	}

	public static class Primary {
		
		@NotEmpty
		private String location;

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}
		
	}
	
	@NotNull
	@Valid
	private Secondary secondary;
	
	public static class Secondary {
		
		@NotEmpty
		private String location;

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}
		
	}

}
