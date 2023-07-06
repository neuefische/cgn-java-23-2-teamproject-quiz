package de.quizmasters.backend.models;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepo extends MongoRepository<Quiz, String> {
}
