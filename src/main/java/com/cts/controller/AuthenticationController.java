package com.cts.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cts.exception.UserError;
import com.cts.model.HmsUser;
import com.cts.service.HmsUserAuthenticationProvider;
import com.cts.util.JwtResponse;
import com.cts.util.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Tag(name="Authentication", description = "This is Authentication User  RestApi")

@Slf4j
@RestController
@CrossOrigin(origins ="*")
@RequiredArgsConstructor
public class AuthenticationController {

	private final HmsUserAuthenticationProvider authenticationProvider;
	private final JwtUtil jwtUtil;

	@Operation(summary = "Perfrom User Authentication")
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody HmsUser hmsUser) {
		log.info("User{} logging in", hmsUser);
		Authentication toAuthenticate = new UsernamePasswordAuthenticationToken(hmsUser.getUsername(),
				hmsUser.getPassword());
		try {
			Authentication authenticatedUser = authenticationProvider.authenticate(toAuthenticate);
			String token = jwtUtil.generateToken(authenticatedUser);
			return ResponseEntity.ok()
					.body(JwtResponse.builder()
							.jwt(token)
							.build());
		} catch (BadCredentialsException e) {
			log.info("Exception {}", e.getMessage());
			return ResponseEntity.badRequest()
					.body(UserError.builder()
							.message(e.getMessage())
							.build());
		}

	}
}

