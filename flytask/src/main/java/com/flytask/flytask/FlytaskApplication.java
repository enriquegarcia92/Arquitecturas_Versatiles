package com.flytask.flytask;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
@SpringBootApplication
public class FlytaskApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlytaskApplication.class, args);
	}

}
