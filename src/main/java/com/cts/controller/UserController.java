package com.cts.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.model.HmsUser;
import com.cts.repository.HmsUserRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Tag(name="User", description = "This is User Info RestApi")
@SecurityRequirement(name ="Hms_Api_Security")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/hms")
@CrossOrigin(origins ="*")
public class UserController {
	private final HmsUserRepository hmsUserRepository;
	String mail = "";
	@Operation(summary = "Get the Details of login user")
	@PreAuthorize("hasRole('DOCTOR') or hasRole('RECEPTIONIST') ")
	@GetMapping("/user")
	public ResponseEntity<String> getLoggedInUser(){
		log.info("Getting user who logged In");
		String principal=(String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		HmsUser user= hmsUserRepository.findByEmail(principal);
		return ResponseEntity.ok(user.getUsername());
	}

}
