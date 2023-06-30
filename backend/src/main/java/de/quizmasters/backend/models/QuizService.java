package de.quizmasters.backend.models;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class QuizService {

    private final QuizRepo quizRepo;

    public List<Quiz> getQuizzes() {
        return quizRepo.getQuizzes();
    }

    public Quiz addQuiz(Quiz newQuiz) {
        newQuiz.setId(IdService.uuid());
        getQuizzes().add(newQuiz);
        return newQuiz;
    }

    public Quiz updateQuiz(String id, Quiz updatedQuiz) {
        Optional<Quiz> quizToUpdate = getQuizzes().stream().filter(quiz -> id.equals(quiz.getId())).findFirst();
        if (quizToUpdate.isPresent()) {
            Quiz quiz = quizToUpdate.get();
           // quiz = updatedQuiz;
            quiz.setQuestion(updatedQuiz.getQuestion());
           quiz.setAnswer(updatedQuiz.getAnswer());
            return quiz;
        } else {
            throw new NullPointerException("Quiz not found");
        }
    }
}
