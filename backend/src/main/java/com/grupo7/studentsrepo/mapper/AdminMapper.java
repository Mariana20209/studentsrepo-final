package com.grupo7.studentsrepo.mapper;

import com.grupo7.studentsrepo.dto.request.AdminRequestDTO;
import com.grupo7.studentsrepo.dto.response.AdminResponseDTO;
import com.grupo7.studentsrepo.model.entity.Admin;

public class AdminMapper {

    public static Admin toEntity(AdminRequestDTO dto) {
        Admin admin = new Admin();
        admin.setNombre(dto.getNombre());
        admin.setEmail(dto.getEmail());
        admin.setUsername(dto.getUsername());
        admin.setPassword(dto.getPassword());
        return admin;
    }

    public static AdminResponseDTO toResponseDTO(Admin admin) {
        AdminResponseDTO dto = new AdminResponseDTO();
        dto.setId(admin.getId());
        dto.setNombre(admin.getNombre());
        dto.setEmail(admin.getEmail());
        dto.setUsername(admin.getUsername());
        dto.setPassword(admin.getPassword());
        return dto;
    }
}