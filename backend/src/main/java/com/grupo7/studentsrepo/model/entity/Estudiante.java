package com.grupo7.studentsrepo.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grupo7.studentsrepo.model.embeddable.NombreCompleto;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "estudiantes")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Estudiante extends BaseEntity {

    @Embedded
    private NombreCompleto nombreCompleto;

    @Column(name = "email",
            nullable = false,
            unique = true,
            length = 150)
    private String email;

    @Column(name = "carrera",
            nullable = false,
            length = 120)
    private String carrera;

    @Column(name = "username",
            nullable = false,
            unique = true,
            length = 50)
    private String username;

    @Column(name = "password",
            nullable = false,
            length = 255)
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "estudiante",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Proyecto> proyectos = new ArrayList<>();
}