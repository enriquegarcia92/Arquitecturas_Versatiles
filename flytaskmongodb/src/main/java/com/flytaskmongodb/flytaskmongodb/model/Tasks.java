package com.flytaskmongodb.flytaskmongodb.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;
import java.util.Date;

@Builder
@Document(collection = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Tasks {
    @Transient
    public static final String SEQUENCE_NAME = "task_sequence";

    @Id
    private Integer taskId;

    @JsonAlias("title")
    private String title;

    @JsonAlias("description")
    private String description;

    @JsonAlias("status")
    private Integer status;

    @JsonAlias("creationDate")
    private Date creationDate;

    @JsonAlias("dueDate")
    private Date dueDate;

    @DBRef
    private User user;

    public Tasks(String title, String description, Integer status, Date creationDate, Date dueDate, User user) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.user = user;
    }
}
