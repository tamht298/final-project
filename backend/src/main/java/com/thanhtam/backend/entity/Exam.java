package com.thanhtam.backend.entity;

import com.thanhtam.backend.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

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

    @Column(name = "shuffle")
    private boolean isShuffle;

    @Column(name = "duration_exam")
    private int durationExam;

    @Column(name="begin_exam")
    private Date beginExam;

    @Column(name = "finish_exam")
    private Date finishExam;

    @Column(name = "locked")
    private boolean locked;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinTable(name = "exam_user",
            joinColumns = {@JoinColumn(name = "exam_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    private Set<User> users;

    @ManyToMany(
            cascade = {CascadeType.DETACH, CascadeType.REFRESH},
            fetch = FetchType.EAGER
    )
    @JoinTable(
            name = "exam_question",
            joinColumns = {@JoinColumn(name = "test_id")},
            inverseJoinColumns = {@JoinColumn(name = "question_id")}
    )
    private List<Question> questionList;

    @ManyToOne()
    @JoinColumn(name = "course_id")
    private Course course;

}
