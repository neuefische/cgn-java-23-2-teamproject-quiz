package de.quizmasters.backend.models;

import de.quizmasters.backend.exception.NoSuchQuizException;
import org.junit.jupiter.api.Assertions;
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
        Quiz testQuiz1= new Quiz( "123","Sind Giraffen größer als Hunde?", new ArrayList<>( List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        )));
        Quiz testQuiz2= new Quiz( "456","Sind Hunde schneller als Schnecken?", new ArrayList<>( List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        )));
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
        Quiz newQuiz= new Quiz( "123","Welche Farben haben Zebras?", new ArrayList<>( List.of(
                new Answer("Schwarz-Weiß", true),
                new Answer("Rot-Weiß", false),
                new Answer("Bunt", false),
                new Answer("Keine Ahnung", false)
        )));
        //WHEN
        Quiz actualQuiz = quizService.addQuiz(newQuiz);
        //THEN
        Assertions.assertEquals(newQuiz, actualQuiz);
    }

    @Test
    void updateQuiz_whenUpdateQuizIsCalled() {
        //GIVEN
        Quiz updatedQuiz= new Quiz( "123","Welches Tier hat Streifen?", new ArrayList<>( List.of(
                new Answer("Zebra", true),
                new Answer("Hund", false),
                new Answer("Maus", false),
                new Answer("Keine Ahnung", false)
        )));
        //WHEN
        when(quizRepo.existsById("123")).thenReturn(true);
        when(quizRepo.save(updatedQuiz)).thenReturn(updatedQuiz);
        Quiz actualQuiz = quizService.updateQuiz("123", updatedQuiz);
        //THEN
        verify(quizRepo).save(updatedQuiz);
        Assertions.assertEquals(updatedQuiz, actualQuiz);
    }

    @Test
    void expectNoSuchQuizException_whenUpdateWithNonExistingId() {
        Quiz testQuiz= new Quiz( "000","Welches Tier hat Streifen?", new ArrayList<>( List.of(
                new Answer("Zebra", true),
                new Answer("Hund", false),
                new Answer("Maus", false),
                new Answer("Keine Ahnung", false)
        )));
        Assertions.assertThrows(NoSuchQuizException.class, () -> quizService.updateQuiz("000", testQuiz));
    }

    @Test
    void expectListWithoutQuizToDelete_whenDeleteIsCalled() {
        // GIVEN
        when(quizRepo.existsById("123")).thenReturn(true);
        doNothing().when(quizRepo).deleteById("123");
        // WHEN
        quizService.deleteQuiz("123");
        // THEN
        verify(quizRepo).deleteById("123");
    }

    @Test
    void expectNoSuchQuizException_whenDeleteWithNonExistingId() {
        Assertions.assertThrows(NoSuchQuizException.class, () -> quizService.deleteQuiz("000"));
    }
}
