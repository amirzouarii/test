package com.example.neo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Node
public class Message {

    @Id @GeneratedValue
    private Long id;

    private String text;
    private long timestamp;

    @Relationship(type = "REPLY", direction = Relationship.Direction.OUTGOING)
    private List<Message> replies = new ArrayList<>();


}
