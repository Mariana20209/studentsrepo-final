package com.grupo7.studentsrepo.controller;

import com.grupo7.studentsrepo.dto.request.ProyectoRequestDTO;
import com.grupo7.studentsrepo.dto.response.ProyectoResponseDTO;
import com.grupo7.studentsrepo.mapper.ProyectoMapper;
import com.grupo7.studentsrepo.model.entity.Proyecto;
import com.grupo7.studentsrepo.service.ProyectoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proyectos")
@Tag(name = "Proyectos", description = "Gestión de proyectos académicos")

public class ProyectoController {

    @Autowired
    private ProyectoService proyectoService;

    @Operation(summary = "Obtener todos los proyectos")
    @GetMapping
    public List<ProyectoResponseDTO> getAll() {
        return proyectoService.findAll().stream()
            .map(ProyectoMapper::toResponseDTO)
            .toList();
    }

    @Operation(summary = "Obtener proyecto por ID")
    @GetMapping("/{id}")
    public ProyectoResponseDTO getById(@PathVariable Long id) {
        return ProyectoMapper.toResponseDTO(proyectoService.findById(id));
    }

    @Operation(summary = "Filtrar por estado")
    @GetMapping("/estado/{estado}")
    public List<ProyectoResponseDTO> getByEstado(@PathVariable String estado) {
        return proyectoService.findAll().stream()
            .filter(p -> p.getEstado().equals(estado))
            .map(ProyectoMapper::toResponseDTO)
            .toList();
    }

    @Operation(summary = "Filtrar por area")
    @GetMapping("/area/{area}")
    public List<ProyectoResponseDTO> getByArea(@PathVariable String area) {
        return proyectoService.findAll().stream()
            .filter(p -> p.getArea().equals(area))
            .map(ProyectoMapper::toResponseDTO)
            .toList();
    }

    @Operation(summary = "Crear proyecto")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProyectoResponseDTO create(@RequestBody ProyectoRequestDTO requestDTO) {
        Proyecto proyecto = ProyectoMapper.toEntity(requestDTO);
        return ProyectoMapper.toResponseDTO(proyectoService.save(proyecto));
    }

    @Operation(summary = "Actualizar proyecto")
    @PutMapping("/{id}")
    public ProyectoResponseDTO update(
        @PathVariable Long id,
        @RequestBody ProyectoRequestDTO requestDTO) {
        Proyecto proyecto = ProyectoMapper.toEntity(requestDTO);
        return ProyectoMapper.toResponseDTO(proyectoService.update(id, proyecto));
    }

    @Operation(summary = "Eliminar proyecto")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        proyectoService.delete(id);
    }
}