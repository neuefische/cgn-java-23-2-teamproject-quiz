package de.quizmasters.backend.controllers;

import de.quizmasters.backend.models.Answer;
import de.quizmasters.backend.models.Quiz;
import de.quizmasters.backend.models.QuizService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
class QuizControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    QuizService quizService;


    @Test
    void expectAllQuizzes_whenGetAllQuizzes() throws Exception {

        Quiz quiz1=quizService.addQuiz(new Quiz("123", "Sind Giraffen größer als Hunde?", List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        )));
        Quiz quiz2=quizService.addQuiz(new Quiz("456", "Sind Hunde schneller als Schnecken?", List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        )));
        String expectedList= String.format("""
                [
                    {
                        "id": "%s",
                        "question": "Sind Giraffen größer als Hunde?",
                        "answers": [
                            {
                                "answerText": "Ja",
                                "rightAnswer": true
                            },
                            {
                                "answerText": "Nein",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Vielleicht",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    },
                    {
                        "id": "%s",
                        "question": "Sind Hunde schneller als Schnecken?",
                        "answers": [
                            {
                                "answerText": "Ja",
                                "rightAnswer": true
                            },
                            {
                                "answerText": "Nein",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Vielleicht",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                ]
                """,quiz1.getId(), quiz2.getId());
        mockMvc.perform(MockMvcRequestBuilders.get("/api/quiz"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectNewQuiz_whenAddNewQuiz() throws Exception {

        String expectedQuiz= """
                {
                        "question": "Welche Farben haben Zebras?",
                        "answers": [
                            {
                                "answerText": "Schwarz-Weiß",
                                "rightAnswer": true
                            },
                            {
                                "answerText": "Rot-Weiß",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Bunt",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/api/quiz")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                                                  {
                                                                     "question": "Welche Farben haben Zebras?",
                                                                    "answers": [
                                        {
                                            "answerText": "Schwarz-Weiß",
                                            "rightAnswer": true
                                        },
                                        {
                                            "answerText": "Rot-Weiß",
                                            "rightAnswer": false
                                        },
                                        {
                                            "answerText": "Bunt",
                                            "rightAnswer": false
                                        },
                                        {
                                            "answerText": "Keine Ahnung",
                                            "rightAnswer": false
                                        }
                                    ]
                                }
                                            """)
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedQuiz));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void expectUpdatedQuiz_whenUpdateQuiz() throws Exception {

        Quiz testQuiz1 = new Quiz("123", "Sind Giraffen größer als Hunde?", List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        ));
        Quiz testQuiz2 = new Quiz("456", "Sind Hunde schneller als Schnecken?", List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        ));
        quizService.addQuiz(testQuiz1);
        quizService.addQuiz(testQuiz2);
        String expectedQuiz= String.format("""
                {
                        "id": "%s",
                        "question": "Welches Tier hat Streifen?",
                        "answers": [
                            {
                                "answerText": "Zebra",
                                "rightAnswer": true
                            },
                            {
                                "answerText": "Hund",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Maus",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                """, testQuiz1.getId());

        mockMvc.perform(MockMvcRequestBuilders.put(String.format("/api/quiz/%s",testQuiz1.getId()))
                        .contentType(MediaType.APPLICATION_JSON).content(String.format("""
                                                        {
                        "id": "%s",
                        "question": "Welches Tier hat Streifen?",
                        "answers": [
                            {
                                "answerText": "Zebra",
                                "rightAnswer": true
                            },
                            {
                                "answerText": "Hund",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Maus",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                                """, testQuiz1.getId()))
                        .with(csrf()))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedQuiz));
    }

    @Test
    @WithMockUser
    void expectListWithoutQuizToDelete_whenDeleteQuiz() throws Exception {
        Quiz testQuiz1 = new Quiz("123", "Sind Giraffen größer als Hunde?", List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        ));
        Quiz testQuiz2 = new Quiz("456", "Sind Hunde schneller als Schnecken?", List.of(
                new Answer("Ja", true),
                new Answer("Nein", false),
                new Answer("Vielleicht", false),
                new Answer("Keine Ahnung", false)
        ));
        quizService.addQuiz(testQuiz1);
        quizService.addQuiz(testQuiz2);
        String expectedList = String.format("""
                                          [
                                                {
                        "id": "%s",
                        "question": "Sind Hunde schneller als Schnecken?",
                        "answers": [
                            {
                                "answerText": "Ja",
                                "rightAnswer": true
                            },
                            {
                                "answerText": "Nein",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Vielleicht",
                                "rightAnswer": false
                            },
                            {
                                "answerText": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                                          ]
                                            
                """, testQuiz2.getId());


        mockMvc.perform(MockMvcRequestBuilders.delete(String.format("/api/quiz/%s", testQuiz1.getId()))
                        .with(csrf()))


                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }
}
