package demo.model.secondary;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class SecondaryModel {
	
	@Id
	@Column(name = "ID", unique = true, nullable = false)
	private int id;
	
	@Column(name = "name", nullable = false)
	private String name;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}
