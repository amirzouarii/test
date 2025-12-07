package com.example.neo.repository;

import com.example.neo.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends Neo4jRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("MATCH (u:User {email: $email})-[r:SENT]->(m:Message) " +
            "OPTIONAL MATCH (m)-[r2:REPLY*]->(reply:Message) " +
            "RETURN u, collect(r), collect(m), collect(r2), collect(reply)")
    Optional<User> findByEmailWithMessages(String email);
}