package com.grupo7.studentsrepo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EstudianteResponseDTO {

    private Long id;

    private String nombres;
    private String apellidos;

    private String email;
    private String carrera;
    private String username;
    private String password;

}
