package com.eblj.dsdeliveryman.rest.services;

import com.eblj.dsdeliveryman.dto.UserDTO;
import com.eblj.dsdeliveryman.dto.UserInsertDTO;
import com.eblj.dsdeliveryman.entities.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
	public UserDTO findById(Long id);
	public UserDTO save(UserInsertDTO userDto);
	UserDetails authenticate(User user);
	UserDTO authenticatedUser(String email);
}
