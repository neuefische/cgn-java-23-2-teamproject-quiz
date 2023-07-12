import './App.css'
import {useEffect, useState} from "react";
import {Quiz, DtoQuiz} from "./model/Quiz.tsx";
import axios from "axios";
import Form from "./components/Form.tsx";
import {Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage.tsx";
import AllQuizzes from "./components/AllQuizzes.tsx";
import LoginPage from "./components/LoginPage.tsx";

export default function App() {
    const [quizzes, setQuizzes] = useState<Quiz[]>()

    useEffect(getAllQuizzes, [])

    function getAllQuizzes() {
        axios.get('/api/quiz')
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
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
            .then((response) => {
                console.log(response.data)
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

    if (!quizzes)
        return <h1> ... loading </h1>

    return (
        <>
            <Routes>
                <Route path={"/"} element={
                    <LandingPage/>
                }>
                </Route>
                <Route path={"/all-quizzes"} element={
                    <AllQuizzes quizzes={quizzes} onUpdate={updateQuiz} onDelete={deleteQuiz}/>
                }>
                </Route>
                <Route path={"/all-quizzes/add"} element={
                    <Form getAll={getAllQuizzes} onAdd={handleAddQuiz}/>
                }>
                </Route>
                <Route path={"/login"} element={<LoginPage/>}>
                </Route>
            </Routes>
        </>
    )
}
