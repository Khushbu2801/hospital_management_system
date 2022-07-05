package com.cts.config;

import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cts.filter.JwtExceptionHandlerFilter;
import com.cts.filter.JwtRequestFilter;
import com.cts.service.HmsUserAuthenticationProvider;

import lombok.RequiredArgsConstructor;
@EnableWebSecurity
@RequiredArgsConstructor

@EnableGlobalMethodSecurity(prePostEnabled = true)
public class HmsSecurityConfiguration extends WebSecurityConfigurerAdapter{
	private final HmsUserAuthenticationProvider provider;
	private final JwtRequestFilter jwtRequestFilter;
	private final JwtExceptionHandlerFilter jwtExceptionHandlerFilter;
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf()
				.disable()
				.cors().and()
				.authorizeRequests()
				.antMatchers("/test/**", "/authenticate/**","/doctor/**","/swagger-ui/**","/v3/**")
				.permitAll()
				.anyRequest()
				.authenticated()
				.and()
				.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtExceptionHandlerFilter, UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

	}
}
