package com.grupo7.studentsrepo.service;

import com.grupo7.studentsrepo.model.embeddable.NombreCompleto;
import com.grupo7.studentsrepo.model.entity.Estudiante;
import com.grupo7.studentsrepo.repository.EstudianteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    public List<Estudiante> findAll() {
        return estudianteRepository.findAll();
    }

    public Estudiante findById(Long id) {
        return findEntity(id);
    }

    public List<Estudiante> findByCarrera(String carrera) {
        return estudianteRepository
                .findByCarreraContainingIgnoreCase(carrera);
    }

    public List<Estudiante> findByApellidos(String apellidos) {
        return estudianteRepository
                .findByNombreCompleto_ApellidosContainingIgnoreCase(apellidos);
    }

    @Transactional
    public Estudiante save(Estudiante request) {

        if (estudianteRepository.existsByEmail(request.getEmail())) {

            throw new IllegalArgumentException(
                    "Ya existe un estudiante con ese email: "
                            + request.getEmail()
            );
        }

        return estudianteRepository.save(request);
    }

    @Transactional
    public Estudiante update(Long id, Estudiante request) {

        Estudiante estudiante = findEntity(id);

        if (estudiante.getNombreCompleto() == null) {
            estudiante.setNombreCompleto(new NombreCompleto());
        }

        estudiante.getNombreCompleto()
                .setNombres(request.getNombreCompleto().getNombres());

        estudiante.getNombreCompleto()
                .setApellidos(request.getNombreCompleto().getApellidos());

        estudiante.setCarrera(request.getCarrera());
        estudiante.setEmail(request.getEmail());

        return estudianteRepository.save(estudiante);
    }

    @Transactional
    public void delete(Long id) {

        findEntity(id);

        estudianteRepository.deleteById(id);
    }

    public Estudiante findEntity(Long id) {

        return estudianteRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(
                                "Estudiante no encontrado con id: " + id
                        ));
    }

}
