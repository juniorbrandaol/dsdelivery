package com.eblj.dsdeliveryman.dto;


import com.eblj.dsdeliveryman.entities.User;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

import java.util.HashSet;
import java.util.Set;
public class UserDTO  {

	private Long id;
	@Size(min = 4,max = 12,message = "Nome deve conter no mínimo {min} e no máximo {max} caracteres.")
	@NotBlank(message = "Campo obrigatório.")
	private String firstName;
	@Size(min = 10,max = 25,message = "Último nome deve conter no mínimo {min} e no máximo {max} caracteres.")
	@NotBlank(message = "Campo obrigatório.")
	private String lastName;
	@Size(min = 11,max = 14)
	@CPF(message = "Informe um cpf válido.")
	@Column(unique = true,name = "Cpf único")
	private String cpf;
	@NotBlank(message = "Campo obrigatório.")
	@Column(unique = true)
	private String phone;
	@Size(min = 15,max = 35,message = "E-mail deve conter no mínimo {min} e no máximo {max} caracteres.\"")
	@Email(message = "Informe um email válido.")
	@Column(unique = true)
	private String email;
	@Column(nullable = false)
	private boolean confirmedValidation;
	private Set<RoleDTO> rolles = new HashSet<>();
	public UserDTO() {super();}

	public UserDTO(Long id, String firstName, String lastName,String cpf,String phone, String email) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.cpf = cpf;
		this.email = email;
		this.phone=phone;
	}
	
	public UserDTO(User user) {
		id = user.getId();
		firstName = user.getFirstName();
		lastName = user.getLastName();
		cpf  = user.getCpf();
		email = user.getEmail();
		phone = user.getPhone();
		confirmedValidation = user.getConfirmedValidation();
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Set<RoleDTO> getRolles() {
		return rolles;
	}

	public boolean getConfirmedValidation() {
		return confirmedValidation;
	}
}
