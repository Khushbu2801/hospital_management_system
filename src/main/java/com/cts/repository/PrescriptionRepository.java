package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.Prescription;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer>{

}
