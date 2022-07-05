package com.cts.model;

import java.util.List;
import java.util.Optional;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Schema(description ="Primary key",accessMode = AccessMode.READ_ONLY,required = false)
	private int id;
	
	private String name;
	
	private String email;
	
	private String mobile_no;

	private String address;
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	
	private int age;
	private String disease;
	
	 
}