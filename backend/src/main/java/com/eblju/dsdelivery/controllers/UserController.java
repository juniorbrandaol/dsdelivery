package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.CredentialDTO;
import com.eblju.dsdelivery.dto.TokenDTO;
import com.eblju.dsdelivery.dto.UserDTO;
import com.eblju.dsdelivery.dto.UserInsertDTO;
import com.eblju.dsdelivery.entities.User;
import com.eblju.dsdelivery.rest.services.UserService;
import com.eblju.dsdelivery.rest.services.security.jwt.JwtService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController  {

	@Autowired
	private UserService service;
	@Autowired
	private JwtService jwtService;
	@Operation(summary = "Get all Users")
	@GetMapping
	public List<UserDTO> findAll(){
		return service.findAll();
	}

	@Operation(summary = "Get a User by its id")
	@GetMapping("/{id}")
	public UserDTO findById( @Parameter(description = "id of user to be searched") @PathVariable Long id) {
		return service.findById(id);
	}
	@Operation(summary = "Save an User")
	@PostMapping("/save")
	@ResponseStatus(value = HttpStatus.CREATED)
	public UserDTO save( @Validated @RequestBody UserInsertDTO dto) {
		return service.save(dto);
	}
	@Operation(summary = "Get a User Authorization ")
	@PostMapping("/auth")
	public TokenDTO authenticate(@RequestBody CredentialDTO dto){
		try{
			User user = new User();
			user.setEmail(dto.getEmail());
			user.setPassword(dto.getPassword());

			UserDetails usuarioAutenticado = service.authenticate(user) ;
			String token =  jwtService.accessToken(user);
			return   new TokenDTO(user.getEmail(),token);
		}
		catch ( RuntimeException e){
			throw  new ResponseStatusException(HttpStatus.UNAUTHORIZED ,e.getMessage());
		}
	}


}
