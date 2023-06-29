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
        Quiz testQuiz1 = new Quiz("1", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("2", "Sind Hunde schneller als Schnecken?", "Ja");
        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2));
        //WHEN
        when(quizRepo.getAllQuizzes()).thenReturn(expectedList);
        List<Quiz> actualList = quizService.getAllQuizzesService();
        //THEN
        assertEquals(expectedList, actualList);
        verify(quizRepo).getAllQuizzes();
    }
    @Test
    void getNewQuizInList_whenAddQuizServiceIsCalled() {
        //GIVEN
        Quiz newQuiz= new Quiz("3", "Welche Farben haben Zebras?", "Schwarz-Weiß");
        Quiz testQuiz1 = new Quiz("1", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("2", "Sind Hunde schneller als Schnecken?", "Ja");
        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2, newQuiz));
        //WHEN
        when(quizRepo.addQuiz(newQuiz)).thenReturn(expectedList);
        List<Quiz> actualList = quizService.addQuizService(newQuiz);
        //THEN
        assertEquals(expectedList, actualList);
        verify(quizRepo).addQuiz(newQuiz);
    }

    @Test
    void updateQuizInList_whenUpdateQuizServiceIsCalled() {
        //GIVEN
        Quiz updatedQuiz= new Quiz("2", "Welches Tier hat Streifen?", "Zebra");
        Quiz testQuiz1 = new Quiz("1", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("2", "Sind Hunde schneller als Schnecken?", "Ja");
        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, updatedQuiz));
        //WHEN
        when(quizRepo.updateQuiz(updatedQuiz)).thenReturn(expectedList);
        List<Quiz> actualList = quizService.updateQuizService(updatedQuiz);
        //THEN
        assertEquals(expectedList, actualList);
        verify(quizRepo).updateQuiz(updatedQuiz);
    }
}