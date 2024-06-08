package com.flytask.flytask.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "\"TASKS\"", schema = "FLYTASK")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TSK_ID")
    private Integer taskId;

    @Column(name ="TSK_TITLE", nullable = false)
    @JsonAlias("title")
    private String title;

    @Column(name ="TSK_DESC", nullable = false)
    @JsonAlias("description")
    private String description;

    @Column(name ="TSK_STATUS", nullable = false)
    @JsonAlias("status")
    private Integer status;

    @Column(name ="TSK_CREATION_DATE", nullable = false)
    @JsonAlias("creationDate")
    private Timestamp creationDate;

    @Column(name ="TSK_DUE_DATE", nullable = false)
    @JsonAlias("dueDate")
    private Timestamp dueDate;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "USR_ID", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonAlias(value = "userId")
    @JsonIgnore
    private User user;

    public Tasks(String title, String description, Integer status, Timestamp creationDate, Timestamp dueDate, User user) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.user = user;
    }
}
