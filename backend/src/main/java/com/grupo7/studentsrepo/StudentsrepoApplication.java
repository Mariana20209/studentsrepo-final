package com.grupo7.studentsrepo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class StudentsrepoApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentsrepoApplication.class, args);
    }

}