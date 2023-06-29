package de.quizmasters.backend.models;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class QuizRepo {
    private final List<Quiz> quizList = new ArrayList<>(List.of(
            new Quiz( "123","Sind Giraffen größer als Hunde?", "Ja"),
            new Quiz("456","Sind Hunde schneller als Schnecken?", "Ja")
    ));

    public List<Quiz> getAllQuizzes() {
        return quizList;
    }

    public List<Quiz> addQuiz(Quiz newQuiz) {
        newQuiz.setId(IdService.uuid());
        quizList.add(newQuiz);
        return quizList;
    }

    public Quiz updateQuiz(String id, Quiz updatedQuiz) {
        Optional<Quiz> quizToUpdate = quizList.stream().filter(quiz -> id.equals(quiz.getId())).findFirst();
        if (quizToUpdate.isPresent()) {
            Quiz quiz = quizToUpdate.get();
            quiz.setQuestion(updatedQuiz.getQuestion());
            quiz.setAnswer(updatedQuiz.getAnswer());
            return quiz;
        } else {
            throw new NullPointerException("Quiz not found");
        }
    }
}