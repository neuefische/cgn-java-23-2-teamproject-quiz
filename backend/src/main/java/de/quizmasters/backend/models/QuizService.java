package de.quizmasters.backend.models;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class QuizService {

    private final QuizRepo quizRepo;

    public List<Quiz> getQuizzes() {
        return quizRepo.findAll();
    }

    public Quiz addQuiz(Quiz newQuiz) {
        newQuiz.setId(IdService.uuid());
        quizRepo.insert(newQuiz);
        return newQuiz;
    }

    public Quiz updateQuiz(String id, Quiz updatedQuiz) {
        try {
            quizRepo.findById(id).orElseThrow();
            quizRepo.save(updatedQuiz);
            return updatedQuiz;
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }

    public List<Quiz> deleteQuiz(String idToDelete) {
        try {
            quizRepo.findById(idToDelete).orElseThrow();
            quizRepo.deleteById(idToDelete);
            return getQuizzes();
        } catch (NoSuchElementException e) {
            throw new NoSuchElementException();
        }
    }
}
