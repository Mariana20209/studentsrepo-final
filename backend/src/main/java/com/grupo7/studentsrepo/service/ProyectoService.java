package com.grupo7.studentsrepo.service;

import com.grupo7.studentsrepo.model.entity.Proyecto;
import com.grupo7.studentsrepo.repository.ProyectoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ProyectoService {

    @Autowired
    private ProyectoRepository proyectoRepository;

    public List<Proyecto> findAll() {
        return proyectoRepository.findAll();
    }

    public Proyecto findById(Long id) {
        return findEntity(id);
    }

    @Transactional
    public Proyecto save(Proyecto request) {
        if (request.getEstado() == null || request.getEstado().isEmpty()) {
            request.setEstado("Pendiente");
        }
        return proyectoRepository.save(request);
    }

    @Transactional
    public Proyecto update(Long id, Proyecto request) {
        Proyecto proyecto = findEntity(id);
        proyecto.setTitulo(request.getTitulo());
        proyecto.setDescripcion(request.getDescripcion());
        proyecto.setArea(request.getArea());
        proyecto.setEstado(request.getEstado());
        proyecto.setEstudiante(request.getEstudiante());
        proyecto.setFecha(request.getFecha());
        proyecto.setArchivoUrl(request.getArchivoUrl());
        return proyectoRepository.save(proyecto);
    }

    @Transactional
    public void delete(Long id) {
        findEntity(id);
        proyectoRepository.deleteById(id);
    }

    public Proyecto findEntity(Long id) {
        return proyectoRepository.findById(id)
            .orElseThrow(() ->
                new NoSuchElementException("Proyecto no encontrado con id: " + id));
    }
}