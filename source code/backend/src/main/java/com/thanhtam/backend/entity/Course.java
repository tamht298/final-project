package com.thanhtam.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "course")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "course_code")
    private String courseCode;

    @Column(name = "name")
    private String name;

    @Column(name = "img_url")
    private String imgUrl;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "course_intake", joinColumns = {@JoinColumn(name = "course_id", referencedColumnName = "id")},
            inverseJoinColumns = {
                    @JoinColumn(name = "intake_id", referencedColumnName = "id")})
    private List<Intake> intakes;
}
