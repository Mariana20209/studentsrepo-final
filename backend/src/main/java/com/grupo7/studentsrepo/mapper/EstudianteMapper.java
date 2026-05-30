package com.grupo7.studentsrepo.mapper;

import com.grupo7.studentsrepo.dto.request.EstudianteRequestDTO;
import com.grupo7.studentsrepo.dto.response.EstudianteResponseDTO;
import com.grupo7.studentsrepo.model.embeddable.NombreCompleto;
import com.grupo7.studentsrepo.model.entity.Estudiante;

public class EstudianteMapper {

    public static Estudiante toEntity(EstudianteRequestDTO dto) {
        Estudiante estudiante = new Estudiante();
        NombreCompleto nombreCompleto = new NombreCompleto();
        nombreCompleto.setNombres(dto.getNombres());
        nombreCompleto.setApellidos(dto.getApellidos());
        estudiante.setNombreCompleto(nombreCompleto);
        estudiante.setEmail(dto.getEmail());
        estudiante.setCarrera(dto.getCarrera());
        estudiante.setUsername(dto.getUsername());
        estudiante.setPassword(dto.getPassword());
        return estudiante;
    }

    public static EstudianteResponseDTO toResponseDTO(Estudiante estudiante) {
        EstudianteResponseDTO dto = new EstudianteResponseDTO();
        dto.setId(estudiante.getId());
        dto.setNombres(estudiante.getNombreCompleto().getNombres());
        dto.setApellidos(estudiante.getNombreCompleto().getApellidos());
        dto.setEmail(estudiante.getEmail());
        dto.setCarrera(estudiante.getCarrera());
        dto.setUsername(estudiante.getUsername());
        dto.setPassword(estudiante.getPassword());
        return dto;
    }
}