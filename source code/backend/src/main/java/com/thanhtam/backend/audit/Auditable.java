package com.thanhtam.backend.audit;

import com.thanhtam.backend.entity.User;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@EntityListeners({AuditingEntityListener.class})
@Data
public abstract class Auditable<PK extends Serializable> extends AbstractPersistable<PK> {
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate;

    @ManyToOne
    @CreatedBy
    private User createdBy;

    @ManyToOne
    @LastModifiedBy
    private User lastModifiedBy;
}
