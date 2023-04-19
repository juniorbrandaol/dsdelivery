package com.eblju.dsdelivery.rest.services;

import com.eblju.dsdelivery.dto.UserDTO;
import com.eblju.dsdelivery.dto.UserInsertDTO;
import com.eblju.dsdelivery.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
	

	public UserDTO findById(Long id);
	public UserDTO save(UserInsertDTO userDto);
	UserDetails authenticate(User user);
	List<UserDTO> findAll();
}
