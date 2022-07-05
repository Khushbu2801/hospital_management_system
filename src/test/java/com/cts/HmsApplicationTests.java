package com.cts;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.cts.util.JwtUtil;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.lang.annotation.Repeatable;
import java.security.Principal;
import java.util.Optional;

import javax.net.ssl.SSLEngineResult.Status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties.Build;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import com.cts.model.Appointment;
import com.cts.model.Gender;
import com.cts.model.HmsUser;
import com.cts.model.MedicalReport;
import com.cts.model.Patient;
import com.cts.model.Person;
import com.cts.model.Prescription;
import com.cts.model.Role;
import com.cts.repository.DoctorRepository;
import com.cts.repository.HmsUserRepository;
import com.cts.valueobject.DoctorDto;
import org.springframework.security.test.context.support.WithMockUser;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import lombok.RequiredArgsConstructor;

import org.junit.Before;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ContextConfiguration
public class HmsApplicationTests {
	@Autowired
	private MockMvc mockMvc;

	@Autowired
	ObjectMapper object;

	private HmsUserRepository hmsrpo;

	@Test
	// 2 save the data in Person and Hms_user with testing
	public void testCreateDoctor() throws JsonProcessingException, Exception {

		DoctorDto doctordto = DoctorDto.builder().name("Vipul").qualification("MBBS").specialist("Surgeon")
				.gender(Gender.MALE)
				.mobile_no("1234567890")
				.age(24)
				.email("vipul@gmail.com")
				.password("12345")
				.build();
		Person person = Person.builder()
				.name(doctordto.getName())
				.qualification(doctordto.getQualification())
				.specialist(doctordto.getSpecialist())
				.gender(doctordto.getGender())
				.mobile_no(doctordto.getMobile_no())
				.age(doctordto.getAge())
				.role(Role.DOCTOR)

				.build();
		HmsUser hmsuser = HmsUser.builder()
				.email(doctordto.getEmail())
				.password(doctordto.getPassword())
				.person(person)
				.build();
		mockMvc.perform(post("/doctor/registration").contentType(MediaType.APPLICATION_JSON)
				.content(object.writeValueAsString(doctordto))).andExpect(status().isOk());

	}

	@Test
	@WithMockUser(username = "receptionist", roles = { "RECEPTIONIST" })
	// 3save the data in Person and Hms_user with testing
	public void testCreatePatient() throws JsonProcessingException, Exception {

		Patient patient = Patient.builder()
				.name("sai")
				.gender(Gender.MALE)
				.mobile_no("1234567890")
				.age(24)
				.email("vipul@gmail.com")
				.address("maygaon Devi")
				.disease("heart")
				.build();
		mockMvc.perform(post("/api/hms/receptionist/patient").contentType(MediaType.APPLICATION_JSON)
				.content(object.writeValueAsString(patient))).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(username = "receptionist", roles = { "RECEPTIONIST" })
	// 6 save the data in Person and Hms_user with testing
	public void testCreateappointment() throws JsonProcessingException, Exception {

		Appointment appointment = Appointment.builder()
				.date(null)
				.description("heart")
				.build();
		mockMvc.perform(post("/api/hms/receptionist/addAppointment").contentType(MediaType.APPLICATION_JSON)
				.content(object.writeValueAsString(appointment))).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(username = "doctor", roles = { "DOCTOR" })
	// 7 save the data in Person and Hms_user with testing
	public void testCreatePrescription() throws JsonProcessingException, Exception {

		Prescription prescription = Prescription.builder()

				.details("get test")
				.build();
		mockMvc.perform(post("/api/hms/doctor/addPrescription/1").contentType(MediaType.APPLICATION_JSON)
				.content(object.writeValueAsString(prescription))).andExpect(status().isOk());
	}

	@Test
	@WithMockUser(username = "doctor", roles = { "DOCTOR" })
	public void getappointmentidtest() throws Exception {
		mockMvc.perform(get("/api/hms/doctor/appointment/1").accept(MediaType.APPLICATION_JSON)).andDo(print())
				.andExpect(status().isOk());
	}

	@Test // 9
	@WithMockUser(username = "doctor", roles = { "DOCTOR" })
	public void getappointmenttest() throws Exception {
		mockMvc.perform(get("/api/hms/doctor/appointment").accept(MediaType.APPLICATION_JSON)).andDo(print())
				.andExpect(status().isOk());
	}

	@Test // 10
	@WithMockUser(username = "receptionist", roles = { "RECEPTIONIST" })
	public void getpatienttest() throws Exception {
		mockMvc.perform(get("/api/hms/receptionist/getPatient").accept(MediaType.APPLICATION_JSON)).andDo(print())
				.andExpect(status().isOk());
	}

	@Test // 13
	@WithMockUser(username = "receptionist", roles = { "RECEPTIONIST" })
	public void patientdeletetest() throws Exception {
		mockMvc.perform(delete("/api/hms/receptionist/delete/1").accept(MediaType.APPLICATION_JSON)).andDo(print())
				.andExpect(status().isNoContent());
	}
}
