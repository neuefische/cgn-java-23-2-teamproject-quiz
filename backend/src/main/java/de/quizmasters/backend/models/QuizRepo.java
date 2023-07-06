package de.quizmasters.backend.models;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public interface QuizRepo extends MongoRepository<Quiz, String> {
}

}