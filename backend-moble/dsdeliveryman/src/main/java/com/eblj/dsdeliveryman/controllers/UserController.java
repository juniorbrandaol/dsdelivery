package com.eblj.dsdeliveryman.controllers;

import com.eblj.dsdeliveryman.dto.CredentialDTO;
import com.eblj.dsdeliveryman.dto.TokenDTO;
import com.eblj.dsdeliveryman.dto.UserDTO;
import com.eblj.dsdeliveryman.dto.UserInsertDTO;
import com.eblj.dsdeliveryman.entities.User;
import com.eblj.dsdeliveryman.rest.services.UserService;
import com.eblj.dsdeliveryman.rest.services.exceptions.PasswordInvalidException;
import com.eblj.dsdeliveryman.rest.services.security.JwtService;
import io.jsonwebtoken.MalformedJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController  {

	@Autowired
	private UserService service;
	@Autowired
	private JwtService jwtService;

	@Operation(summary = "Get an User by its id")
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UserDTO findById( @Parameter(description = "id of user to be searched") @PathVariable Long id) {
		return service.findById(id);
	}
	@Operation(summary = "Save an User")
	@PostMapping("/save")
	@ResponseStatus(value = HttpStatus.CREATED)
	public UserDTO save( @Valid @RequestBody UserInsertDTO dto) {
		return service.save(dto);
	}

	@Operation(summary = "Get an User Authorization ")
	@PostMapping("/auth")
	public TokenDTO authenticate(@RequestBody @Valid CredentialDTO dto){
		try{
			User user = new User();
			user.setEmail(dto.getEmail());
			user.setPassword(dto.getPassword());
			UserDetails usuarioAutenticado = service.authenticate(user) ;
			String token =  jwtService.accessToken(user);
			return   new TokenDTO(user.getEmail(),token,user.getRoles().toString());
		}
		catch ( RuntimeException e){
			throw  new PasswordInvalidException();
		}
	}

	@Operation(summary = "Get an User Authenticated ")
	@GetMapping("/currentusername")
	public UserDTO currentUserName(Authentication authentication){
		try {
			authentication = SecurityContextHolder.getContext().getAuthentication();
			String login = authentication.getName();
			return service.authenticatedUser(login);
		} catch (MalformedJwtException e) {
			return null;
		}
	}
	@Operation(summary = "Check if the User is authenticated ")
	@GetMapping("/userisauthenticated")
	public boolean CheckIsAuthenticated(Authentication authentication) {
			return authentication.isAuthenticated();
	}

}
