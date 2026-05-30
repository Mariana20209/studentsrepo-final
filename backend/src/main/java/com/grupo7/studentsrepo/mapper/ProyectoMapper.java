package com.grupo7.studentsrepo.mapper;

import com.grupo7.studentsrepo.dto.request.ProyectoRequestDTO;
import com.grupo7.studentsrepo.dto.response.ProyectoResponseDTO;
import com.grupo7.studentsrepo.model.entity.Proyecto;

public class ProyectoMapper {

    public static Proyecto toEntity(ProyectoRequestDTO dto) {
        Proyecto proyecto = new Proyecto();
        proyecto.setTitulo(dto.getTitulo());
        proyecto.setDescripcion(dto.getDescripcion());
        proyecto.setArea(dto.getArea());
        proyecto.setEstado(dto.getEstado());
        proyecto.setEstudiante(dto.getEstudiante());
        proyecto.setFecha(dto.getFecha());
        proyecto.setArchivoUrl(dto.getArchivoUrl());
        return proyecto;
    }

    public static ProyectoResponseDTO toResponseDTO(Proyecto proyecto) {
        ProyectoResponseDTO dto = new ProyectoResponseDTO();
        dto.setId(proyecto.getId());
        dto.setTitulo(proyecto.getTitulo());
        dto.setDescripcion(proyecto.getDescripcion());
        dto.setArea(proyecto.getArea());
        dto.setEstado(proyecto.getEstado());
        dto.setEstudiante(proyecto.getEstudiante());
        dto.setFecha(proyecto.getFecha());
        dto.setArchivoUrl(proyecto.getArchivoUrl());
        return dto;
    }
}