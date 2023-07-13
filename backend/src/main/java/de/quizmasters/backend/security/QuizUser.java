package de.quizmasters.backend.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record QuizUser(
        @Id
        String id,
        String username,
        String password
) {
}
