package de.quizmasters.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Quiz {

    private String id;
    private String question;
    private List<Answer> answers;

}
