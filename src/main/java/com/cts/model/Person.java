package com.cts.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Person {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Schema(description ="Primary key",accessMode = AccessMode.READ_ONLY,required = false)
	private int id;
	private String name;
	private String qualification;
	private String specialist;
	private String mobile_no;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	private int age;
	@Enumerated(EnumType.STRING)
	private Role role;
	@Schema(accessMode = AccessMode.READ_ONLY,required = false)
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@JsonIgnore
	@OneToOne(mappedBy = "person", fetch = FetchType.LAZY)
	private HmsUser user;
	/*
	 * @JsonIgnore
	 * 
	 * @OneToMany(mappedBy ="person") private List<Appointment> appointment;
	 */
}
