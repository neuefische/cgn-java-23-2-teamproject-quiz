package de.quizmasters.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuizUserRepo extends MongoRepository<QuizUser, String> {
    Optional<QuizUser> findByUsername(String username);
}
