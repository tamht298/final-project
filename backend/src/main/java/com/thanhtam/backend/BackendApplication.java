package com.thanhtam.backend;

import com.thanhtam.backend.audit.SpringSecurityAuditorAware;
import com.thanhtam.backend.entity.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class BackendApplication {

	@Bean
	public AuditorAware<User> auditorAware() {
		return new SpringSecurityAuditorAware();
	}
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
