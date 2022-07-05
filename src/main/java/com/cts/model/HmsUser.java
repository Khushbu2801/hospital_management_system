package com.cts.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.AccessMode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.EqualsAndHashCode.Exclude;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Schema(description = "User Object Authentication and Authorization")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class HmsUser implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Schema(description = "Primary key", accessMode = AccessMode.READ_ONLY, required = false)
	private int id;
	@Schema(description = "Email", accessMode = AccessMode.READ_WRITE, required = true)
	@Column(unique = true)
	private String email;
	@Schema(description = "Password", accessMode = AccessMode.READ_WRITE, required = true)
	private String password;
	@Schema(description = "Person details", accessMode = AccessMode.READ_ONLY, required = false)
	@Exclude
	@ToString.Exclude
	@OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
	@JoinColumn(name = "person_id")
	private Person person;
	@Schema(description = "new Authorities", accessMode = AccessMode.READ_ONLY, required = false)
	@Exclude
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "User_Role", joinColumns = @JoinColumn(name = "User_Id"), inverseJoinColumns = @JoinColumn(name = "Role_Id"))
	@Default
	private List<UserAuthority> authorities = new ArrayList<>();

	@Schema(description = "rule", accessMode = AccessMode.READ_ONLY, required = false)
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Schema(description = "rule", accessMode = AccessMode.READ_ONLY, required = false)
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Schema(description = "rule", accessMode = AccessMode.READ_ONLY, required = false)
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Schema(description = "username", accessMode = AccessMode.READ_ONLY, required = false)
	@Override
	public boolean isEnabled() {
		return true;
	}

	@Schema(description = "username", accessMode = AccessMode.READ_ONLY, required = false)
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

}
