package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.MedicalReport;

public interface MedicalReportRepository extends JpaRepository<MedicalReport, Integer>{

}
