package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{

}
