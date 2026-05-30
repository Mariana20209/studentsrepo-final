package com.grupo7.studentsrepo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AdminResponseDTO {

    private Long id;

    private String nombre;

    private String email;
    private String username;
    private String password;

}