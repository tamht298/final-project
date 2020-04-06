package com.thanhtam.backend.entity;

import com.thanhtam.backend.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

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

    @Column(name = "duration_exam")
    private int durationExam;




}
