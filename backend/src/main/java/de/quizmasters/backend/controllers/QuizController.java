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
    public List<Quiz> getAll(){
        return quizService.getAllQuizzesService();
    }

    @PostMapping
    public List<Quiz> add(@RequestBody Quiz newQuiz) {
        return quizService.addQuizService(newQuiz);
    }

    @PutMapping
    public List<Quiz> update( @RequestBody Quiz updatedQuiz){return quizService.updateQuizService(updatedQuiz);}
}
