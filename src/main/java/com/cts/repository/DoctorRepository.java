package com.cts.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.Person;

public interface DoctorRepository extends JpaRepository<Person, String> {
	Optional<Person> findByName(String doc_name);
}
