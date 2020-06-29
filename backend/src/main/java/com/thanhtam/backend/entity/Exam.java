package com.thanhtam.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.thanhtam.backend.audit.Auditable;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "exam")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exam extends Auditable<Long> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "title")
    private String title;

    @Column(name = "shuffle", columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean isShuffle;

    @Column(name = "duration_exam")
    private int durationExam;

    @Column(name = "begin_exam")
    private Date beginExam;

    @Column(name = "finish_exam")
    private Date finishExam;


    @Column(name = "locked", columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean locked;

    @ManyToOne()
    @JoinColumn(name = "intake_id")
    private Intake intake;

//    @OneToMany(mappedBy="exam", fetch = FetchType.EAGER)
//    private List<ExamUser> examUsers = new ArrayList<>();

    @Column(name="question_data", columnDefinition = "text")
    private String questionData;

    @ManyToOne()
    @JoinColumn(name = "part_id")
    private Part part;

}
