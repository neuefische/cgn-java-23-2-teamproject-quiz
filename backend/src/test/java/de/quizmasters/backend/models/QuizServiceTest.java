package de.quizmasters.backend.models;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuizServiceTest {

    QuizRepo quizRepo = mock(QuizRepo.class);
    QuizService quizService = new QuizService(quizRepo);

    @Test
    void getsListOfQuizzes_whenGetAllQuizzesIsCalled() {
        //GIVEN
        Quiz testQuiz1 = new Quiz( "123","Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("456","Sind Hunde schneller als Schnecken?", "Ja");
        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2));
        //WHEN
        when(quizRepo.getAllQuizzes()).thenReturn(expectedList);
        List<Quiz> actualList = quizService.getAllQuizzesService();
        //THEN
        verify(quizRepo).getAllQuizzes();
        assertEquals(expectedList, actualList);
    }
    @Test
    void getNewQuiz_whenAddQuizIsCalled() {
        //GIVEN
        Quiz newQuiz= new Quiz("123","Welche Farben haben Zebras?", "Schwarz-Weiß");
        //WHEN
        when(quizRepo.addQuiz(newQuiz)).thenReturn(newQuiz);
        Quiz actualQuiz = quizService.addQuiz(newQuiz);
        //THEN
        verify(quizRepo).addQuiz(newQuiz);
        assertEquals(newQuiz, actualQuiz);
    }

    @Test
    void updateQuiz_whenUpdateQuizIsCalled() {
        //GIVEN
        Quiz updatedQuiz= new Quiz( "123","Welches Tier hat Streifen?", "Zebra");
        //WHEN
        when(quizRepo.updateQuiz(updatedQuiz.getId(), updatedQuiz)).thenReturn(updatedQuiz);
        Quiz actual = quizService.updateQuiz(updatedQuiz.getId(), updatedQuiz);
        //THEN
        verify(quizRepo).updateQuiz(updatedQuiz.getId(), updatedQuiz);
        assertEquals(updatedQuiz, actual);
    }
}