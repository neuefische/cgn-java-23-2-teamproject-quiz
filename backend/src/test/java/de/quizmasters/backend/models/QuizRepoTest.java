package de.quizmasters.backend.models;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.*;

class QuizRepoTest {

    QuizRepo quizRepo = new QuizRepo();

    @Test
    void getList_whenGetAllQuizzesIsCalled() {
        //GIVEN
        Quiz testQuiz1 = new Quiz("123","Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz( "456","Sind Hunde schneller als Schnecken?", "Ja");

        List<Quiz> expectedList = new ArrayList<>(List.of(testQuiz1, testQuiz2));

        //WHEN

        List<Quiz> actualList = quizRepo.getQuizzes();
        //THEN
        Assertions.assertEquals(expectedList, actualList);

    }
    @Test
    void getNewQuizInList_whenAddQuizIsCalled(){
        //GIVEN
        Quiz addedQuiz= new Quiz("789","Welche Farben haben Zebras?", "Schwarz-Weiß");
        //WHEN
        Quiz actualQuiz =quizRepo.addQuiz(addedQuiz);
        //THEN
        Assertions.assertEquals(addedQuiz, actualQuiz);
    }

    @Test
    void updateQuiz_whenEditQuiz(){
        //GIVEN
        Quiz expectedQuiz= new Quiz("123","Welches Tier hat Streifen?", "Zebra");
        //WHEN
        Quiz actualQuiz=quizRepo.updateQuiz("123",expectedQuiz);
        //THEN
        Assertions.assertEquals(expectedQuiz, actualQuiz);
    }

}