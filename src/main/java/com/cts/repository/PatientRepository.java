package com.cts.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer>{
	Optional<Patient> findByName(String pat_name);
}
