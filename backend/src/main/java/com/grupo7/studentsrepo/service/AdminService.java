package com.grupo7.studentsrepo.service;

import com.grupo7.studentsrepo.model.entity.Admin;
import com.grupo7.studentsrepo.repository.AdminRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> findAll() {
        return adminRepository.findAll();
    }

    public Admin findById(Long id) {
        return findEntity(id);
    }

    @Transactional
    public Admin save(Admin request) {
        return adminRepository.save(request);
    }

    @Transactional
    public Admin update(Long id, Admin request) {

        Admin admin = findEntity(id);

        admin.setEmail(request.getEmail());
        admin.setNombre(request.getNombre());

        return adminRepository.save(admin);
    }

    @Transactional
    public void delete(Long id) {

        findEntity(id);

        adminRepository.deleteById(id);
    }

    public Admin findEntity(Long id) {

        return adminRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Admin no encontrado con id: " + id));
    }

}