package de.quizmasters.backend.models;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
public class DtoQuiz {
    @Id
    private String id;
    @NotBlank
    @Size(min = 5, max = 256)
    private String question;
    @Size(min = 2, max = 4)
    private List<Answer> answers;
}
