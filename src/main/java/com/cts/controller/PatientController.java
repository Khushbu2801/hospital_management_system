package com.cts.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cts.exception.ResourceNotFoundException;
import com.cts.model.Appointment;
import com.cts.model.MedicalReport;
import com.cts.model.Patient;
import com.cts.model.Person;
import com.cts.model.Prescription;
import com.cts.repository.AppointmentRepository;
import com.cts.repository.DoctorRepository;
import com.cts.repository.MedicalReportRepository;
import com.cts.repository.PatientRepository;
import com.cts.repository.PrescriptionRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Tag(name = "Patient", description = "This is Patient RestApi")
@SecurityRequirement(name ="Hms_Api_Security")
@RestController
@RequestMapping("/api/hms/receptionist")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@Slf4j
public class PatientController {

	private final DoctorRepository doctorRepo;
	private final AppointmentRepository appointementRepo;
	private final PatientRepository patientRepo;
	private final MedicalReportRepository medicalReportRepository;
	private final PrescriptionRepository preRepository;

	// build create patient REST API
	@Operation(summary = "Create Patient")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@PostMapping("/patient")
	public ResponseEntity<Patient> create(@RequestBody Patient patient) {
		log.info(patient.toString());
		return ResponseEntity.ok(patientRepo.save(patient));

	}

	@Operation(summary = "Update Patient Details")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@PutMapping("update/{id}")
	public ResponseEntity<Patient> updatePatient(@PathVariable Integer id, @RequestBody Patient patientDetails) {// working
		Patient updatePatient = patientRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: " + id));
		updatePatient.setName(patientDetails.getName());
		updatePatient.setEmail(patientDetails.getEmail());
		updatePatient.setMobile_no(patientDetails.getMobile_no());
		updatePatient.setAddress(patientDetails.getAddress());
		updatePatient.setGender(patientDetails.getGender());
		updatePatient.setAge(patientDetails.getAge());
		updatePatient.setDisease(patientDetails.getDisease());
		patientRepo.save(updatePatient);
		return ResponseEntity.ok(updatePatient);
	}

	// build Delete By Id patient REST API
	@Operation(summary = "Delete Patient By Patient_id")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@DeleteMapping("delete/{id}")
	public ResponseEntity<?> deletePatient(@PathVariable Integer id) {
		log.info("Deleting Patient with id {}", id);

		Patient deletePatient = Patient.builder().id(id).build();
		patientRepo.delete(deletePatient);
		return ResponseEntity.noContent().build();
	}

	@Operation(summary = "Get the all list Patient")
	// build View patient REST API
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@GetMapping("/getPatient")
	public ResponseEntity<List<Patient>> getPatients() {
		return ResponseEntity.ok(patientRepo.findAll());// working
	}

	//// build View Doctor REST API
	@Operation(summary = "Get the all list Doctors")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@GetMapping("/getDoctors")
	public ResponseEntity<List<Person>> getAllDoctors() {
		return ResponseEntity.ok(doctorRepo.findAll());
	}

	// build Add Appointment REST API
	@Operation(summary = "Book the Appointment")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@PostMapping("/addAppointment") //// working
	public Appointment create(@RequestBody Appointment appointment) {
		log.info(appointment.toString());
		return appointementRepo.save(appointment);
		// return new ResponseEntity<Appointment>(appointment,HttpStatus.CREATED);

	}

	// build REST API of get patient by id
	@Operation(summary = "Get the Patient")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@GetMapping("/getPatient/{id}")
	public ResponseEntity<Patient> getpatientById(@PathVariable Integer id) {
		Patient app = patientRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not exist with id:" + id));
		log.info(app.toString());
		return ResponseEntity.ok(app);
	}

	// build view prescription REST API
	@Operation(summary = "View Prescription Details")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@GetMapping("/viewPrescription")
	public ResponseEntity<List<Prescription>> getPrescription() {
		return ResponseEntity.ok(preRepository.findAll());
	}

	// build create medical report REST API
	@Operation(summary = "Get the Prescription of Paticular Patient")
	@PreAuthorize("hasRole('RECEPTIONIST')")
	@GetMapping("/getPrescription/{id}")
	public ResponseEntity<Prescription> getprescriptionById(@PathVariable Integer id) {
		Prescription app = preRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Prescription does not exist with id:" + id));
		log.info(app.toString());
		return ResponseEntity.ok(app);
	}

}
