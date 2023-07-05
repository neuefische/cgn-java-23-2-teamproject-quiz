package de.quizmasters.backend.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class QuizServiceTest {

    QuizRepo quizRepo = mock(QuizRepo.class);

    QuizService quizService = new QuizService(quizRepo);

    @Test
    void getsListOfQuizzes_whenGetAllQuizzesIsCalled() {
        //GIVEN
        Quiz testQuiz1 = new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("456", "Sind Hunde schneller als Schnecken?", "Ja");
        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2));
        //WHEN
        when(quizRepo.findAll()).thenReturn(expectedList);
        List<Quiz> actualList = quizService.getQuizzes();
        //THEN
        verify(quizRepo).findAll();
        assertEquals(expectedList, actualList);
    }

    @Test
    void getNewQuiz_whenAddQuizIsCalled() {
        //GIVEN
        Quiz newQuiz = new Quiz("123", "Welche Farben haben Zebras?", "Schwarz-Weiß");
        //WHEN
        Quiz actualQuiz = quizService.addQuiz(newQuiz);
        //THEN
        Assertions.assertEquals(newQuiz, actualQuiz);
    }

    @Test
    void updateQuiz_whenUpdateQuizIsCalled() {
        //GIVEN
        Quiz updatedQuiz = new Quiz("123", "Welches Tier hat Streifen?", "Zebra");
        //WHEN
        when(quizRepo.findById("123")).thenReturn(Optional.of(new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja")));
        when(quizRepo.save(updatedQuiz)).thenReturn(updatedQuiz);
        Quiz actualQuiz = quizService.updateQuiz("123", updatedQuiz);
        //THEN
        verify(quizRepo).save(updatedQuiz);
        Assertions.assertEquals(updatedQuiz, actualQuiz);
    }

    @Test
    void expectNoSuchElementException_whenUpdateWithNonExistingId() {
        Quiz testQuiz = new Quiz("000", "Welches Tier hat Streifen?", "Zebra");
        Assertions.assertThrows(NoSuchElementException.class, () -> quizService.updateQuiz("000", testQuiz));
    }


    @Test
    void expectListWithoutQuizToDelete_whenDeleteIsCalled() {
        // GIVEN


        when(quizRepo.findById("123")).thenReturn(Optional.of(new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja")));
        doNothing().when(quizRepo).deleteById("123");

        // WHEN
        quizService.deleteQuiz("123");

        // THEN
        verify(quizRepo).deleteById("123");
    }


    @Test
    void expectNoSuchElementException_whenDeleteWithNonExistingId() {
        Assertions.assertThrows(NoSuchElementException.class, () -> quizService.deleteQuiz("000"));
    }
}