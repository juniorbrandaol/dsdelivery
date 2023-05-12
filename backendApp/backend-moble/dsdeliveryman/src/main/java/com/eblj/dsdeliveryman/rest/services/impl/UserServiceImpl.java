package com.eblj.dsdeliveryman.rest.services.impl;

import com.eblj.dsdeliveryman.dto.RoleDTO;
import com.eblj.dsdeliveryman.dto.UserDTO;
import com.eblj.dsdeliveryman.dto.UserInsertDTO;
import com.eblj.dsdeliveryman.entities.Role;
import com.eblj.dsdeliveryman.entities.User;
import com.eblj.dsdeliveryman.repositories.RoleRepository;
import com.eblj.dsdeliveryman.repositories.UserRepository;
import com.eblj.dsdeliveryman.rest.services.UserService;
import com.eblj.dsdeliveryman.rest.services.exceptions.ConstraintViolationException;
import com.eblj.dsdeliveryman.rest.services.exceptions.PasswordInvalidException;
import com.eblj.dsdeliveryman.rest.services.exceptions.UserNotConfirmedValidation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

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
		try {
			User entity = new User();
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new UserDTO(entity);
		}catch (RuntimeException e){
			throw new ConstraintViolationException(e.getMessage());
		}
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
		entity.setPhone(dto.getPhone());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());

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
		User validationUser;
		try {
			validationUser =  repository.findByEmail(user.getEmail()).get();
		}catch (NoSuchElementException e){
			throw new PasswordInvalidException();
		}
		if(validationUser.getConfirmedValidation()==false) {
			throw new UserNotConfirmedValidation();
		}else {
			UserDetails userDetails = loadUserByUsername(user.getEmail());
			boolean ifPassword = encoder.matches(user.getPassword(), userDetails.getPassword());
			if (ifPassword) {
				return userDetails;
			}
			throw new PasswordInvalidException();
		}
	}

	@Override
	@Transactional(readOnly = true)
	public UserDTO authenticatedUser(String email) {
		User user =  repository.findByEmail(email)
			.orElseThrow(()-> new UsernameNotFoundException("Usuário não encontrado na base de dados"));
		return new UserDTO(user);
	}

	@Override
	@Transactional(readOnly = true)
	public void switchValidationUser(Long id) {
		User user = repository.getReferenceById(id);
		if(user==null){
		  throw new UsernameNotFoundException("Usuário não encontrado na base de dados");
		}else{
		  repository.switchValidation(user.getId());
		}
	}


}
