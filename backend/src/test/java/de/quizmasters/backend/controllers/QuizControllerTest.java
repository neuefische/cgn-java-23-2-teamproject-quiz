package de.quizmasters.backend.controllers;

import de.quizmasters.backend.models.Quiz;
import de.quizmasters.backend.models.QuizService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class QuizControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    QuizService quizService;


    @Test
    void expectAllQuizzes_whenGetAllQuizzes() throws Exception {

        String expectedList = """
                [    {        "question": "Sind Giraffen größer als Hunde?",        "answer": "Ja"    },
                    {        "question": "Sind Hunde schneller als Schnecken?",        "answer": "Ja"    }
                    ]
                """;

        quizService.addQuiz(new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja"));
        quizService.addQuiz(new Quiz("456", "Sind Hunde schneller als Schnecken?", "Ja"));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/quiz"))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

    @Test
    @DirtiesContext
    void expectNewQuiz_whenAddNewQuiz() throws Exception {

        String expectedQuiz = """
                        {
                         "question": "Welche Farben haben Zebras?",
                         "answer": "Schwarz-Weiß"
                       }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/quiz")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                                        {
                                                         "id": "3",
                                                         "question": "Welche Farben haben Zebras?",
                                                         "answer": "Schwarz-Weiß"
                                                        }
                                """))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedQuiz));
    }

    @Test
    @DirtiesContext
    void expectUpdatedQuiz_whenUpdateQuiz() throws Exception {
        Quiz testQuiz1 = new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("456", "Sind Hunde schneller als Schnecken?", "Ja");
        quizService.addQuiz(testQuiz1);
        quizService.addQuiz(testQuiz2);
        String expectedQuiz = String.format("""
                                            {
                                             "id": "%s",
                                              "question": "Welches Tier hat Streifen?",
                                                "answer": "Zebra"
                                                }
                """, testQuiz1.getId());

        mockMvc.perform(MockMvcRequestBuilders.put(String.format("/api/quiz/%s",testQuiz1.getId()))
                        .contentType(MediaType.APPLICATION_JSON).content(String.format("""
                                                        {
                                                         "id": "%s",
                                                         "question": "Welches Tier hat Streifen?",
                                                         "answer": "Zebra"
                                                        }
                                """, testQuiz1.getId())))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedQuiz));
    }

    @Test
    void expectListWithoutQuizToDelete_whenDeleteQuiz() throws Exception {
        Quiz testQuiz1 = new Quiz("123", "Sind Giraffen größer als Hunde?", "Ja");
        Quiz testQuiz2 = new Quiz("456", "Sind Hunde schneller als Schnecken?", "Ja");
        quizService.addQuiz(testQuiz1);
        quizService.addQuiz(testQuiz2);
        String expectedList = String.format("""
                                          [
                                                {
                                                     "id": "%s",
                                                     "question": "Sind Hunde schneller als Schnecken?",
                                                     "answer": "Ja"
                                                }
                                          ]
                                            
                """, testQuiz2.getId());


        mockMvc.perform(MockMvcRequestBuilders.delete(String.format("/api/quiz/%s", testQuiz1.getId())))


                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

}
