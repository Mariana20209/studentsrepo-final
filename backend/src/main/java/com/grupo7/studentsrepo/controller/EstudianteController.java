package com.grupo7.studentsrepo.controller;

import com.grupo7.studentsrepo.dto.request.EstudianteRequestDTO;
import com.grupo7.studentsrepo.dto.response.EstudianteResponseDTO;

import com.grupo7.studentsrepo.mapper.EstudianteMapper;

import com.grupo7.studentsrepo.model.entity.Estudiante;

import com.grupo7.studentsrepo.service.EstudianteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/estudiantes")
@Tag(name = "Estudiantes", description = "Gestión de estudiantes")

public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    @Operation(summary = "Obtener todos los estudiantes")
    @GetMapping
    public List<EstudianteResponseDTO> getAll() {

        return estudianteService.findAll().stream()
                .map(EstudianteMapper::toResponseDTO)
                .toList();
    }

    @Operation(summary = "Obtener estudiante por ID")
    @GetMapping("/{id}")
    public EstudianteResponseDTO getById(@PathVariable Long id) {

        Estudiante estudiante = estudianteService.findById(id);

        return EstudianteMapper.toResponseDTO(estudiante);
    }

    @Operation(summary = "Buscar por carrera")
    @GetMapping("/carrera/{carrera}")
    public List<EstudianteResponseDTO> getByCarrera(
            @PathVariable String carrera
    ) {

        return estudianteService.findByCarrera(carrera).stream()
                .map(EstudianteMapper::toResponseDTO)
                .toList();
    }

    @Operation(summary = "Buscar por apellidos")
    @GetMapping("/buscar")
    public List<EstudianteResponseDTO> getByApellidos(
            @RequestParam String apellidos
    ) {

        return estudianteService.findByApellidos(apellidos).stream()
                .map(EstudianteMapper::toResponseDTO)
                .toList();
    }

    @Operation(summary = "Crear estudiante")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)

    public EstudianteResponseDTO create(
            @RequestBody EstudianteRequestDTO requestDTO
    ) {

        Estudiante estudiante =
                EstudianteMapper.toEntity(requestDTO);

        Estudiante saved =
                estudianteService.save(estudiante);

        return EstudianteMapper.toResponseDTO(saved);
    }

    @Operation(summary = "Actualizar estudiante")
    @PutMapping("/{id}")

    public EstudianteResponseDTO update(
            @PathVariable Long id,
            @RequestBody EstudianteRequestDTO requestDTO
    ) {

        Estudiante estudiante =
                EstudianteMapper.toEntity(requestDTO);

        Estudiante updated =
                estudianteService.update(id, estudiante);

        return EstudianteMapper.toResponseDTO(updated);
    }

    @Operation(summary = "Eliminar estudiante")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)

    public void delete(@PathVariable Long id) {

        estudianteService.delete(id);
    }

}