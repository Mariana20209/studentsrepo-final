package com.grupo7.studentsrepo.controller;

import com.grupo7.studentsrepo.dto.request.AdminRequestDTO;
import com.grupo7.studentsrepo.dto.response.AdminResponseDTO;

import com.grupo7.studentsrepo.mapper.AdminMapper;

import com.grupo7.studentsrepo.model.entity.Admin;

import com.grupo7.studentsrepo.service.AdminService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")

@Tag(name = "Admins", description = "Gestión de administradores")

public class AdminController {

        @Autowired
        private AdminService adminService;

        @Operation(summary = "Obtener todos los admins")
        @GetMapping
        public List<AdminResponseDTO> getAll() {

                return adminService.findAll().stream()
                        .map(AdminMapper::toResponseDTO)
                        .toList();
        }

        @Operation(summary = "Obtener admin por ID")
        @GetMapping("/{id}")

        public AdminResponseDTO getById(
                        @PathVariable Long id) {

                Admin admin = adminService.findById(id);

                return AdminMapper.toResponseDTO(admin);
        }

        @Operation(summary = "Crear admin")
        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)

        public AdminResponseDTO create(
                        @RequestBody AdminRequestDTO requestDTO) {

                Admin admin = AdminMapper.toEntity(requestDTO);

                Admin saved = adminService.save(admin);

                return AdminMapper.toResponseDTO(saved);
        }

        @Operation(summary = "Actualizar admin")
        @PutMapping("/{id}")

        public AdminResponseDTO update(
                        @PathVariable Long id,
                        @RequestBody AdminRequestDTO requestDTO) {

                Admin admin = AdminMapper.toEntity(requestDTO);

                Admin updated = adminService.update(id, admin);

                return AdminMapper.toResponseDTO(updated);
        }

        @Operation(summary = "Eliminar admin")
        @DeleteMapping("/{id}")
        @ResponseStatus(HttpStatus.NO_CONTENT)

        public void delete(@PathVariable Long id) {

                adminService.delete(id);
        }

}