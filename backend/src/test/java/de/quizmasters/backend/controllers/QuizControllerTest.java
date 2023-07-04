package de.quizmasters.backend.controllers;

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

        String expectedList= """
                [
                    {
                        "id": "123",
                        "question": "Sind Giraffen größer als Hunde?",
                        "answers": [
                            {
                                "answer": "Ja",
                                "rightAnswer": true
                            },
                            {
                                "answer": "Nein",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Vielleicht",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    },
                    {
                        "id": "456",
                        "question": "Sind Hunde schneller als Schnecken?",
                        "answers": [
                            {
                                "answer": "Ja",
                                "rightAnswer": true
                            },
                            {
                                "answer": "Nein",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Vielleicht",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                ]
                """;


        mockMvc.perform(MockMvcRequestBuilders.get("/api/quiz"))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

    @Test
    @DirtiesContext
    void expectNewQuiz_whenAddNewQuiz() throws Exception {

        String expectedQuiz= """
                {
                        "question": "Welche Farben haben Zebras?",
                        "answers": [
                            {
                                "answer": "Schwarz-Weiß",
                                "rightAnswer": true
                            },
                            {
                                "answer": "Rot-Weiß",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Bunt",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Keine Ahnung",
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
                                            "answer": "Schwarz-Weiß",
                                            "rightAnswer": true
                                        },
                                        {
                                            "answer": "Rot-Weiß",
                                            "rightAnswer": false
                                        },
                                        {
                                            "answer": "Bunt",
                                            "rightAnswer": false
                                        },
                                        {
                                            "answer": "Keine Ahnung",
                                            "rightAnswer": false
                                        }
                                    ]
                                }
                                            """))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedQuiz));
    }

    @Test
    void expectUpdatedQuiz_whenUpdateQuiz() throws Exception {

        String expectedQuiz= """
                {
                        "id": "123",
                        "question": "Welches Tier hat Streifen?",
                        "answers": [
                            {
                                "answer": "Zebra",
                                "rightAnswer": true
                            },
                            {
                                "answer": "Hund",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Maus",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                """;

        mockMvc.perform(MockMvcRequestBuilders.put("/api/quiz/123")
                        .contentType(MediaType.APPLICATION_JSON).content("""
                                                        {
                        "id": "123",
                        "question": "Welches Tier hat Streifen?",
                        "answers": [
                            {
                                "answer": "Zebra",
                                "rightAnswer": true
                            },
                            {
                                "answer": "Hund",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Maus",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                                """))

                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedQuiz));
    }

    @Test
    void expectListWithoutQuizToDelete_whenDeleteQuiz() throws Exception {

        String expectedList = """
                                          [
                                                {
                        "id": "456",
                        "question": "Sind Hunde schneller als Schnecken?",
                        "answers": [
                            {
                                "answer": "Ja",
                                "rightAnswer": true
                            },
                            {
                                "answer": "Nein",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Vielleicht",
                                "rightAnswer": false
                            },
                            {
                                "answer": "Keine Ahnung",
                                "rightAnswer": false
                            }
                        ]
                    }
                                          ]
                                            
                """;

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/quiz/123"))


                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(expectedList));
    }

}