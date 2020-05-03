package com.thanhtam.backend.entity;

import com.thanhtam.backend.ultilities.EQTypeCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "question_type")
public class QuestionType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_code")
    private EQTypeCode typeCode;

    @Column(name = "description")
    private String description;


}
