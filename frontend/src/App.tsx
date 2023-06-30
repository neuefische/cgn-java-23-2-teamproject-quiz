import './App.css'
import {useEffect, useState} from "react";
import {Quiz, DtoQuiz} from "./model/Quiz.tsx";
import axios from "axios";
import Form from "./components/Form.tsx";
import QuizCard from "./components/QuizCard.tsx";

export default function App() {
    const [quizzes, setQuizzes] = useState<Quiz[]>()

    useEffect(getAllQuizzes, [])

    function getAllQuizzes() {
        axios.get('/api/quiz')
            .then(function (response) {
                setQuizzes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    if (!quizzes)
        return <h1> ... loading </h1>


    function handleAddQuiz(newQuiz: DtoQuiz) {

        axios.post("/api/quiz", newQuiz)
            .then(function (response) {
                console.log(response)
                getAllQuizzes()
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function updateQuiz(updateQuiz: Quiz) {
        axios.put("/api/quiz/" + updateQuiz.id, updateQuiz)
            .then(function (response) {
                console.log(response);
                getAllQuizzes();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div>
                <Form getAll={getAllQuizzes} onAdd={handleAddQuiz}/>
            </div>
            <div>
                {quizzes?.map(quiz => {
                    return <QuizCard key={quiz.id} quiz={quiz} onUpdate={updateQuiz}/>
                })}
            </div>
        </>
    )
}