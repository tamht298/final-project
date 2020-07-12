package com.thanhtam.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.exception.DataException;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "exam_user")
public class ExamUser{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_started", columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean isStarted = false;

    @Column(name = "time_start")
    @Temporal(TemporalType.TIMESTAMP)
    Date timeStart;

    @Column(name = "time_finish")
    @Temporal(TemporalType.TIMESTAMP)
    Date timeFinish;

    @JsonIgnore
    @Column(name="answer_sheet", columnDefinition = "text")
    private String answerSheet;

    @Column(name = "is_finished", columnDefinition = "TINYINT")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private Boolean isFinished = false;

    @Column(name = "remaining_time")
    private int remainingTime;

    @Column(name = "total_point")
    private Double totalPoint;

}

