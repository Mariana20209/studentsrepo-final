package com.grupo7.studentsrepo.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "proyectos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Proyecto extends BaseEntity {

    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;

    @Column(name = "descripcion", length = 1000)
    private String descripcion;

    @Column(name = "area", nullable = false, length = 100)
    private String area;

    @Column(name = "estado", length = 50)
    private String estado = "Pendiente";

    @Column(name = "estudiante", length = 200)
    private String estudiante;

    @Column(name = "fecha", length = 50)
    private String fecha;

    @Column(name = "archivo_url", length = 500)
    private String archivoUrl;
}