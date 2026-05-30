package com.grupo7.studentsrepo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class AdminRequestDTO {

    private String nombre;

    private String email;
    private String username;
    private String password;

}
