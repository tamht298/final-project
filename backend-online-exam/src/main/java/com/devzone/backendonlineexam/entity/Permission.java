package com.devzone.backendonlineexam.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="permission")
@Data
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="name")
    private String name;
}
