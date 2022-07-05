package com.cts.service.impl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cts.service.AuthenticationService;
import com.cts.service.HmsUserAuthenticationProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Service
@Slf4j
@RequiredArgsConstructor
public class HmsUserAuthenticationProviderImpl implements HmsUserAuthenticationProvider {

	private final AuthenticationService authService;
	private final BCryptPasswordEncoder encoder;
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		// TODO Auto-generated method stub
		log.info("Authentication user {} ",authentication.getName());
		String username=authentication.getName();
		UserDetails userdetails=authService.loadUserByUsername(authentication.getName());
		//log.info(userdetails.toString());
		log.info("Matching the Credentials");
		if(encoder.matches((String) authentication.getCredentials(), userdetails.getPassword())) {
			return new UsernamePasswordAuthenticationToken(username, userdetails.getPassword(),userdetails.getAuthorities());
		} else {
			log.error("Password doesnt matches");
			throw new BadCredentialsException("User DoesNot Exist..");
		}
		
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

}
