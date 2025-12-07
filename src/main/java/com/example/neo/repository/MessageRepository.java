package com.example.neo.repository;

import com.example.neo.Message;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface MessageRepository extends Neo4jRepository<Message, Long> {
}
