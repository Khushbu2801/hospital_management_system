package com.cts.controller;

import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.model.Person;
import com.cts.model.Role;
import com.cts.model.HmsUser;
import com.cts.model.UserAuthority;
import com.cts.repository.DoctorRepository;
import com.cts.repository.HmsUserRepository;
import com.cts.repository.UserAuthorityRepository;
import com.cts.valueobject.DoctorDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Tag(name="Registration", description = "This is Doctor Registration RestApi")
@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins ="*")
@RequiredArgsConstructor
@Slf4j
public class RegistrationController {

	private final DoctorRepository doctorRepo;
	private final UserAuthorityRepository authorityRepository;
	private final BCryptPasswordEncoder encoder;
	private final HmsUserRepository hmsUserRepository;
	@Operation(summary = "Register the Doctor")
	@PostMapping("/registration")
	public ResponseEntity<HttpStatus> registerDoctor(@RequestBody DoctorDto doctorDto) {
		log.info("Getting user authorities");
		UserAuthority doctorRole = authorityRepository.findAll()
				.stream()
				.filter(ua -> ua.getAuthority()
						.equals("ROLE_DOCTOR"))
				.findFirst()
				.get();
		log.info("Creating user instance {}", doctorDto);

		HmsUser user = HmsUser.builder()
				.email(doctorDto.getEmail())
				.password(encoder.encode(doctorDto.getPassword()))
				.authorities(Arrays.asList(doctorRole))
				.build();
		log.info("Creating Doctor instance");

		Person person = Person.builder()
				.name(doctorDto.getName())
				.qualification(doctorDto.getQualification())
				.specialist(doctorDto.getSpecialist())
				.gender(doctorDto.getGender())
				.mobile_no(doctorDto.getMobile_no())
				.age(doctorDto.getAge())
				.role(Role.DOCTOR)
				.build();
		log.info("Saving Doctor Details");

		Person savedDoctor = doctorRepo.save(person);
		user.setPerson(savedDoctor);
		hmsUserRepository.save(user);
		return ResponseEntity.ok()
				.build();
	}
}
