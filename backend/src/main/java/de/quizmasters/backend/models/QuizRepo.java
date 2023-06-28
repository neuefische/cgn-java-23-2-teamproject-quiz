package de.quizmasters.backend.models;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class QuizRepo {
    private List<Quiz> quizList=new ArrayList<>(List.of(new Quiz("Sind Giraffen größer als Hunde?", "Ja")));
    public List<Quiz> getAllQuizzes(){
        return quizList;
    }
}