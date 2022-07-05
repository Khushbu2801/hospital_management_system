package com.cts.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Schema(description ="Primary key",accessMode = AccessMode.READ_ONLY,required = false)
	private int id;
	private String details;
//	@Schema(description ="Appointment",accessMode = AccessMode.READ_ONLY,required = false)
	@ToString.Exclude
	@EqualsAndHashCode.Exclude
	@ManyToOne
	@JoinColumn(name="appointment_id")
	private Appointment appointment;
}
