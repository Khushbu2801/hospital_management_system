package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.model.HmsUser;

public interface HmsUserRepository extends JpaRepository<HmsUser, Integer> {
	HmsUser findByEmail(String email);
}
