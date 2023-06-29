package de.quizmasters.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Quiz {

    private String id;
    private String question;
    private String answer;

}
