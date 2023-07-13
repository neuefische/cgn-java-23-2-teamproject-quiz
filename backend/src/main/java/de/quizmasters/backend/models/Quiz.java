package de.quizmasters.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document("quizzes")
public class Quiz {

    @Id
    private String id;
    @NotBlank
    @Size(min=5, max=256)
    private String question;
    @Size(min=2, max=4)
    private List<Answer> answers;

}
