package com.thanhtam.backend.entity;

import com.thanhtam.backend.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="question")
public class Question extends Auditable<Long> implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name = "question_text", columnDefinition = "text")
    private String questionText;

    @Column(name = "shuffle")
    private boolean isShuffle = false;

    @Column(name = "point")
    private double point;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "question_type_id")
    private QuestionType questionType;

    @OneToMany()
    @JoinColumn(name = "question_id")
    private List<Choice> choices;

    @ManyToOne()
    @JoinColumn(name="course_id")
    private Course course;

}
