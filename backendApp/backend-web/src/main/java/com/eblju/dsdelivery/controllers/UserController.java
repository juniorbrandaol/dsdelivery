package com.eblju.dsdelivery.controllers;

import com.eblju.dsdelivery.dto.CredentialDTO;
import com.eblju.dsdelivery.dto.TokenDTO;
import com.eblju.dsdelivery.dto.UserDTO;
import com.eblju.dsdelivery.dto.UserInsertDTO;
import com.eblju.dsdelivery.entities.User;
import com.eblju.dsdelivery.rest.services.UserService;
import com.eblju.dsdelivery.rest.services.impl.UserServiceImpl;
import com.eblju.dsdelivery.rest.services.security.jwt.JwtService;
import io.jsonwebtoken.MalformedJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
	private UserServiceImpl service;
	@Autowired
	private JwtService jwtService;
	@Operation(summary = "Get all Users")
	@GetMapping
	public List<UserDTO> findAll(){
		return service.findAll();
	}

	@Operation(summary = "Get an User by its id")
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

	@Operation(summary = "Get an User Authorization ")
	@PostMapping("/auth")
	public TokenDTO authenticate(@RequestBody CredentialDTO dto){
		try{
			User user = new User();
			user.setEmail(dto.getEmail());
			user.setPassword(dto.getPassword());
			UserDetails usuarioAutenticado = service.authenticate(user) ;
			String token =  jwtService.accessToken(user);
			return   new TokenDTO(user.getEmail(),token,user.getRoles().toString());
		}
		catch ( RuntimeException e){
			throw  new ResponseStatusException(HttpStatus.UNAUTHORIZED ,e.getMessage());
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

	@Operation(summary = "Update email user by id ")
	@PutMapping("/update/email/{idUser}")
	public void updateUserEmail(
			@Parameter(description = "id of user to be searched") @PathVariable Long idUser,
			@Parameter(description = "email to be exchanged")  @RequestBody UserDTO email)
	         {
		service.updateEmail(idUser,email);
	}

	@Operation(summary = "Update phone user by id ")
	@PutMapping("/update/phone/{idUser}")
	public void updateUserPhone(
			@Parameter(description = "id of user to be searched") @PathVariable Long idUser,
			@Parameter(description = "phone to be exchanged")  @RequestBody UserDTO phone)
	{
		service.updatePhone(idUser,phone);
	}

	@Operation(summary = "Update password user by id ")
	@PutMapping("/update/password/{idUser}")
	public void updateUserPassword(
			@Parameter(description = "id of user to be searched") @PathVariable Long idUser,
			@Parameter(description = "password to be exchanged")  @RequestBody UserInsertDTO password)
	{
		service.updatePassword(idUser,password);
	}
}
