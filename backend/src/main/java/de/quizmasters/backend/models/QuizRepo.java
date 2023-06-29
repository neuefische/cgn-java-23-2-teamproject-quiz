package de.quizmasters.backend.models;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class QuizRepo {
    private List<Quiz> quizList=new ArrayList<>(List.of(
            new Quiz("1", "Sind Giraffen größer als Hunde?", "Ja"),
            new Quiz("2", "Sind Hunde schneller als Schnecken?", "Ja")
    ));
    public List<Quiz> getAllQuizzes(){
        return quizList;
    }

    public List<Quiz> addQuiz(Quiz newQuiz){
        quizList.add(newQuiz);
        return quizList;
    }

    public List<Quiz> updateQuiz(Quiz updatedQuiz){
         List<Quiz> quizToUpdate = quizList.stream().filter(quiz -> quiz.getId().equals(updatedQuiz.getId())).toList();
         quizToUpdate.get(0).setAnswer(updatedQuiz.getAnswer());
        quizToUpdate.get(0).setQuestion(updatedQuiz.getQuestion());
        return quizList;
    }
}