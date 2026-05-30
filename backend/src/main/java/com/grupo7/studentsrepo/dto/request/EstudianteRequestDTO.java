package com.grupo7.studentsrepo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EstudianteRequestDTO {

    private String nombres;
    private String apellidos;
    private String email;
    private String carrera;
    private String username;
    private String password;

}