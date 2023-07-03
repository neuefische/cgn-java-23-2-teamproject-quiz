package de.quizmasters.backend.models;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
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
           int index = getQuizzes().indexOf(quizToUpdate.get());
            getQuizzes().set(index, updatedQuiz);
            return updatedQuiz;
        } else {
            throw new NoSuchElementException("Quiz not found");
        }
    }

    public List<Quiz> deleteQuiz(String idToDelete) {
        Optional<Quiz> quizToDelete = getQuizzes().stream().filter(quiz -> quiz.getId().equals(idToDelete)).findFirst();
        if (quizToDelete.isPresent()) {
            getQuizzes().remove(quizToDelete.get());
            return getQuizzes();
        } else {
            throw new NoSuchElementException("Quiz not found");
        }
    }
}
