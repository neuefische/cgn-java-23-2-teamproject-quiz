package de.quizmasters.backend.controllers;

import de.quizmasters.backend.models.Quiz;
import de.quizmasters.backend.models.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    private final QuizService quizService;


    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public List<Quiz> getQuizzes() {
        return quizService.getQuizzes();
    }

    @PostMapping
    public Quiz add(@RequestBody Quiz newQuiz) {
        return quizService.addQuiz(newQuiz);
    }

    @PutMapping("{id}")
    public Quiz update(@PathVariable String id, @RequestBody Quiz updatedQuiz) {
        return quizService.updateQuiz(id, updatedQuiz);
    }
}
