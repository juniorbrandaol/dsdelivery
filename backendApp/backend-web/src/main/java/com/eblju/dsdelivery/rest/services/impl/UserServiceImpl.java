package com.eblju.dsdelivery.rest.services.impl;

import java.util.*;
import java.util.stream.Collectors;
import com.eblju.dsdelivery.dto.RoleDTO;
import com.eblju.dsdelivery.dto.UserDTO;
import com.eblju.dsdelivery.dto.UserInsertDTO;
import com.eblju.dsdelivery.entities.Role;
import com.eblju.dsdelivery.entities.User;
import com.eblju.dsdelivery.repositories.RoleRepository;
import com.eblju.dsdelivery.repositories.UserRepository;
import com.eblju.dsdelivery.rest.services.UserService;
import com.eblju.dsdelivery.rest.services.exceptions.ResourceNotFoundException;
import com.eblju.dsdelivery.rest.services.exceptions.SenhaInvalidaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
@Service
public class UserServiceImpl implements UserService, UserDetailsService {
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private UserRepository repository;
	@Autowired
	private RoleRepository roleRepository;
	@Override
	@Transactional
	public UserDTO save(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new UserDTO(entity);
	}
	@Override
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
		return new UserDTO(entity);
	}

	private void copyDtoToEntity(UserInsertDTO dto, User entity) {

		String passwordCripto = encoder.encode(dto.getPassword());

		entity.setPassword(passwordCripto);
		entity.setFirstName(dto.getFirstName());
		entity.setCpf(dto.getCpf());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		entity.setPhone(dto.getPhone());
		entity.getRoles().clear();// apenas para limpar as categorias que possam vir na entity
		for(RoleDTO roleDto: dto.getRolles()) {
			Role roles = roleRepository.getReferenceById(roleDto.getId());
			entity.getRoles().add(roles);
		}
	}

	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		User user =  repository.findByEmail(userEmail)
				.orElseThrow(()-> new UsernameNotFoundException("Usuário não encontrado na base de dados"));
		Set<Role> rolesUser= user.getRoles();
		int size=0;
		String[] roles = new String[rolesUser.size()];
		for (Role x : rolesUser) {
			roles[size] = x.getAuthority();
			size++;
		}
		return org.springframework.security.core.userdetails.User
				.builder()
				.username(user.getEmail())
				.password(user.getPassword())
				.roles(roles)
				.build();
	}
	@Override
	public UserDetails authenticate(User user) {
		UserDetails userDetails= loadUserByUsername(user.getEmail());
		boolean ifPassword = encoder.matches(user.getPassword(),userDetails.getPassword());
		if(ifPassword){
			return userDetails;
		}
		throw new SenhaInvalidaException();
	}
	@Override
	@Transactional(readOnly = true)
	public List<UserDTO> findAll() {
		List<User> user = repository.findAll();
		return user.stream().map(obj-> new UserDTO(obj)).collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public UserDTO authenticatedUser(String email) {
		User user =  repository.findByEmail(email)
			.orElseThrow(()-> new UsernameNotFoundException("Usuário não encontrado na base de dados"));
		return new UserDTO(user);
	}

	@Transactional()
	@Override
	public void updateEmail(Long id, UserDTO dto) {
		try {
			User user = repository.findById(id).get();
			repository.updateUserEmailById(id, dto.getEmail());
		}catch (NoSuchElementException e){
			throw new ResourceNotFoundException("Usuário não encontrado");
		}
	}

	@Transactional()
	@Override
	public void updatePhone(Long id, UserDTO dto) {
		try {
			User user = repository.findById(id).get();
			repository.updateUserPhoneById(id, dto.getPhone());
		}catch (NoSuchElementException e){
			throw new ResourceNotFoundException("Usuário não encontrado");
		}
	}

	@Transactional()
	@Override
	public void updatePassword(Long id, UserInsertDTO dto) {
		try {
			User user = repository.findById(id).get();
			String passwordCripto = encoder.encode(dto.getPassword());
			repository.updateUserPasswordById(id, passwordCripto);
		}catch (NoSuchElementException e){
			throw new ResourceNotFoundException("Usuário não encontrado");
		}
	}


}
