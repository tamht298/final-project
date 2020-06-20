package com.thanhtam.backend.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExamQuestionId implements Serializable {
    @Column(name = "exam_id")
    private Long examId;

    @Column(name = "question_id")
    private Long questionId;
}
