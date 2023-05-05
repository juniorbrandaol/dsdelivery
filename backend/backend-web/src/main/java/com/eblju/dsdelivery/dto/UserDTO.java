package com.eblju.dsdelivery.dto;

import com.eblju.dsdelivery.entities.User;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
public class UserDTO  {
	private Long id;
	@NotBlank(message = "Campo obrigatório.")
	private String firstName;
	private String lastName;
	private String cpf;
	@Email(message = "Informe um email válido.")
	private String email;
	@Column(unique = true)
	private String phone;
	private Set<RoleDTO> rolles = new HashSet<>();
	public UserDTO() {super();}

	public UserDTO(Long id, String firstName, String lastName,String cpf, String email,String phone) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.cpf = cpf;
		this.email = email;
		this.phone = phone;
	}
	
	public UserDTO(User user) {
		id = user.getId();
		firstName = user.getFirstName();
		lastName = user.getLastName();
		cpf  = user.getCpf();
		email = user.getEmail();
		phone = user.getPhone();
		user.getRoles().forEach( role -> this.rolles.add(new RoleDTO(role)));
	}

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
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {return phone;	}
	public void setPhone(String phone) {this.phone = phone;	}
	public Set<RoleDTO> getRolles() {
		return rolles;
	}
	
}
