package de.quizmasters.backend.models;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;


@Repository
public class QuizRepo {
    private final List<Quiz> quizList = new ArrayList<>(List.of(
            new Quiz( "123","Sind Giraffen größer als Hunde?", "Ja"),
            new Quiz("456","Sind Hunde schneller als Schnecken?", "Ja")
    ));

    public List<Quiz> getQuizzes() {
        return quizList;
    }

}