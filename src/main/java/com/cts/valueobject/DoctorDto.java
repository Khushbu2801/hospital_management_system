package com.cts.valueobject;


import com.cts.model.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDto {
	private String email;
	private String password;
	private String name;
	private String qualification;
	private String specialist;
	private String mobile_no;
	private Gender gender;
	private int age;
}
