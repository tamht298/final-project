package com.thanhtam.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "choice")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Choice implements Serializable {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "choice_text")
    private String choiceText;

    @Column(name = "corrected")
    private int isCorrected;


}
