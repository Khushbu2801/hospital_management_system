package com.cts.controller;

import java.util.List;
import java.util.Optional;

import com.cts.exception.ResourceNotFoundException;
import com.cts.exception.UserError;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cts.model.Appointment;
import com.cts.model.Prescription;
import com.cts.repository.AppointmentRepository;
import com.cts.repository.PrescriptionRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Doctor", description = "This is Doctor RestApi")
@SecurityRequirement(name ="Hms_Api_Security")
@RestController
@RequestMapping("/api/hms/doctor")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class DoctorController {
	private final AppointmentRepository appointementRepo;
	private final PrescriptionRepository prescriptionRepo;

	@Operation(summary = "Get Appointment by using Appointment_Id")
	@PreAuthorize("hasRole('DOCTOR')")
	@GetMapping("/appointment/{id}")
	public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer id) {
		Appointment app = appointementRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not exist with id:" + id));
		return ResponseEntity.ok(app);
	}

	@Operation(summary = "Add the Prescription of Patient")
	@PreAuthorize("hasRole('DOCTOR')")
	@PostMapping("/addPrescription/{appointmentId}")
	public ResponseEntity<Prescription> add(@RequestBody Prescription prescription,
			@PathVariable Integer appointmentId) {
		Optional<Appointment> OptAppointment = appointementRepo.findById(appointmentId);
		prescription.setAppointment(OptAppointment.get());

		log.info(prescription.toString());
		// prescriptionRepo.save(prescription);
		return ResponseEntity.ok(prescriptionRepo.save(prescription));
	}

	// List of Appointments
	@Operation(summary="Get the all list that has Book the Appointment")
	@ApiResponses(value={ @ApiResponse(responseCode="200",description="list of appointment",content={@Content(mediaType="application/json"
	,array=@ArraySchema(schema=@Schema(implementation=Appointment.class)))}),
			@ApiResponse(responseCode="403",description="Unauthorized",content={@Content(mediaType="application/json",array=@ArraySchema(schema=@Schema(implementation=UserError.class)))})})

	@PreAuthorize("hasRole('DOCTOR')")
	@GetMapping("/appointment")
	public ResponseEntity<List<Appointment>> getAppointment() {
		return ResponseEntity.ok(appointementRepo.findAll());
	}

	@ExceptionHandler
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public UserError handleException(Exception exception) {
		return UserError.builder().message(exception.getMessage()).build();
	}

}
