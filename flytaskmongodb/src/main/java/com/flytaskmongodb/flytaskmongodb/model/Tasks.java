package com.flytaskmongodb.flytaskmongodb.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

@Builder
@Document(collection = "Tasks")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Tasks {
    @Transient
    public static final String SEQUENCE_NAME = "task_sequence";

    @Id
    @Field("tsk_id")
    private ObjectId taskId;

    @Field("tsk_title")
    @JsonAlias("title")
    private String title;

    @Field("tsk_desc")
    @JsonAlias("description")
    private String description;

    @Field("tsk_status")
    @JsonAlias("status")
    private Integer status;

    @Field("tsk_creation_date")
    @JsonAlias("creationDate")
    private Date creationDate;

    @Field("tsk_due_date")
    @JsonAlias("dueDate")
    private Date dueDate;

    @Field("usr_id")
    @JsonIgnore
    private ObjectId user;

    public Tasks(String title, String description, Integer status, Date creationDate, Date dueDate, ObjectId user) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.user = user;
    }
}
