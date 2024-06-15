package com.flytaskmongodb.flytaskmongodb.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "secuencias")
@Getter
@Setter
public class Sequence {
    @Id
    private String id;
    private int value;
}