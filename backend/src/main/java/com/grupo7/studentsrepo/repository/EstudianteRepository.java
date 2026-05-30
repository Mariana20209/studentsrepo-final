package com.grupo7.studentsrepo.repository;

import com.grupo7.studentsrepo.model.entity.Estudiante;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long> {

    List<Estudiante> findByCarreraContainingIgnoreCase(String carrera);

    List<Estudiante> findByNombreCompleto_ApellidosContainingIgnoreCase(String apellidos);

    boolean existsByEmail(String email);

}
