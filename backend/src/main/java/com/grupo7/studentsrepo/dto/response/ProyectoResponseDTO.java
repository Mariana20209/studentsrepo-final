package com.grupo7.studentsrepo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ProyectoResponseDTO {

    private Long id;
    private String titulo;
    private String descripcion;
    private String area;
    private String estado;
    private String estudiante;
    private String fecha;
    private String archivoUrl;
}