package com.thanhtam.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;
    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Email
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "intake_id")
    private Intake intake;
//
//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    private Set<ExamUser> examUsers = new HashSet<>();

//    @Column(name = "enabled")
//    private boolean enabled = true;
    @Column(name = "deleted", nullable = false)
    private boolean deleted = false;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date", updatable = false, nullable = false)
    private Date createdDate;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "lastest_login_date", updatable = true, nullable = true)
    private Date lastLoginDate;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "role_user", joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
            inverseJoinColumns = {
                    @JoinColumn(name = "role_id", referencedColumnName = "id")})
    private Set<Role> roles;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    public User(String username, String email, Profile profile) {
        this.username = username;
        this.email = email;
        this.profile = profile;
    }

    public User(boolean deleted) {
        this.deleted = deleted;
    }

    public User(String username, String password, String email, Profile profile) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.profile = profile;
    }

    public User(String email, Profile profile) {
        this.email = email;
        this.profile = profile;
    }
}
