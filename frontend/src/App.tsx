import './App.css'
import {useEffect, useState} from "react";
import {Quiz, DtoQuiz, GameQuiz, GameAnswer} from "./model/Quiz.tsx";
import axios from "axios";
import Form from "./components/Form.tsx";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage.tsx";
import AllQuizzes from "./components/AllQuizzes.tsx";

export default function App() {
    const [quizzes, setQuizzes] = useState<Quiz[]>()
    const [gameQuizzes, setGameQuizzes] = useState<GameQuiz[]>()

    useEffect(getAllQuizzes, [])
    useEffect(convertQuiz, [getAllQuizzes])

    function getAllQuizzes() {
        axios.get('/api/quiz')
            .then(response =>  {
                setQuizzes(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function convertQuiz(){
        const gQuizzes: GameQuiz[] = []

        quizzes?.map(quiz=>{
            const gQuiz: GameQuiz = {id: "", question: "", answers: []}
            gQuiz.id = quiz.id
            gQuiz.question = quiz.question
            quiz.answers.map(answer => {
                const gAnswer: GameAnswer = {
                    id: gQuiz.answers.length,
                    answerText: answer.answerText,
                    rightAnswer: answer.rightAnswer,
                }
                gQuiz.answers.push(gAnswer)
            })
            gQuizzes.push(gQuiz)
        })
        setGameQuizzes(gQuizzes)
    }

    function handleAddQuiz(newQuiz: DtoQuiz) {
        axios.post("/api/quiz", newQuiz)
            .then(() => getAllQuizzes())
            .catch(function (error) {
                console.error(error);
            });
    }

    function updateQuiz(updateQuiz: Quiz) {
        axios.put("/api/quiz/" + updateQuiz.id, updateQuiz)
            .then(() => {
                getAllQuizzes()
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function deleteQuiz(quizToDelete: Quiz) {
        axios.delete("/api/quiz/" + quizToDelete.id)
            .then(() => getAllQuizzes())
            .catch(function (error) {
                console.error(error);
            });
    }

    if (!gameQuizzes)
        return <h1> ... loading </h1>

    return (
        <>
            <Routes>
                <Route path={"/"} element={
                    <LandingPage/>
                }>
                </Route>
                <Route path={"/all-quizzes"} element={
                    <AllQuizzes quizzes={gameQuizzes} onUpdate={updateQuiz} onDelete={deleteQuiz}/>
                }>
                </Route>
                <Route path={"/all-quizzes/add"} element={
                    <Form getAll={getAllQuizzes} onAdd={handleAddQuiz}/>
                }>
                </Route>
            </Routes>
        </>
    )
}
