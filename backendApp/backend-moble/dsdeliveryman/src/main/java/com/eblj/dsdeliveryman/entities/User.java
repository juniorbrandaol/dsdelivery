package com.eblj.dsdeliveryman.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "tb_user")
public class User implements Serializable {
	private static final long serialVersionUID = 5177019431887513952L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstName;
	private String lastName;
	@Column(unique = true)
	private String email;
	private String password;
	@Column(unique = true)
	private String phone;
	@Column(unique = true)
	private String cpf;
	@Column(nullable = false)
	private boolean confirmedValidation;
	@ManyToMany(fetch = FetchType.EAGER)// garante que sempre que for carregar o usuario, vai carregar as roles dele obrigatoriamente
	@JoinTable(name="tb_user_role",joinColumns = 
	             @JoinColumn(name="user_id"), inverseJoinColumns =
	             @JoinColumn(name="role_id")  
	          )
	private Set<Role> roles = new HashSet<>();
	
	public User() { super();}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public boolean getConfirmedValidation() {
		return confirmedValidation;
	}

	public void setConfirmedValidation(boolean confirmedValidation) {
		this.confirmedValidation = confirmedValidation;
	}

	@PrePersist
	public void pretConfirmedValidation() {
		this.confirmedValidation = true;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(id, other.id);
	}

	public boolean hasHole(String roleName) {
		for (Role role : roles) {
			if (role.getAuthority().equals(roleName)) {
				return true;
			}
		}
		return false;
	}

}
