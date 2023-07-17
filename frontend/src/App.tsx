import './App.css'
import {useEffect, useState} from "react";
import {Quiz, DtoQuiz} from "./model/Quiz.tsx";
import axios from "axios";
import Form from "./components/Form.tsx";
import {Routes, Route, useNavigate} from "react-router-dom";
import LandingPage from "./components/LandingPage.tsx";
import AllQuizzes from "./components/AllQuizzes.tsx";
import LoginPage from "./components/LoginPage.tsx";
import ProtectedPaths from "./components/ProtectedPaths.tsx";
import {toast} from "react-toastify";
import SignUpPage from "./components/SignUpPage.tsx";

export default function App() {
    const [quizzes, setQuizzes] = useState<Quiz[]>()
    const [user, setUser] = useState<string>()
    const navigate = useNavigate()

    useEffect(signedIn, [])
    useEffect(getAllQuizzes, [])

    function signedIn() {
        axios.get("/api/user/me")
            .then(response => {
                setUser(response.data)
            })
    }

    function handleLogout() {
        axios.post("/api/user/logout")
            .then(request => console.log(request.data))
        setUser("anonymousUser")
        toast.info("Logged out!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

    function handleSignUp(username: string, password: string) {
        axios.post("/api/user/sign-up", {username, password})
            .then(response => {
                setUser(response.data)
                navigate("/")
            })
    }

    function handleLogin(username: string, password: string) {
        axios.post("/api/user/login", null, {auth: {username, password}})
            .then(response => {
                setUser(response.data)
                navigate("/")
            })
    }

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


    if (!quizzes)
        return <h1> ... loading </h1>

    return (
        <>
            <Routes>
                <Route element={<ProtectedPaths user={user}/>}>
                    <Route path={"/all-quizzes/add"} element={
                        <Form getAll={getAllQuizzes} onAdd={handleAddQuiz}/>
                    }>
                    </Route>
                </Route>
                <Route path={"/"} element={
                    <LandingPage onLogout={handleLogout} user={user} signedIn={signedIn}/>
                }>
                </Route>
                <Route path={"/login"} element={<LoginPage onLogin={handleLogin} user={user}/>}>
                </Route>
                <Route path={"/sign-up"} element={<SignUpPage onSignUp={handleSignUp}/>}>
                </Route>
                <Route path={"/all-quizzes"} element={
                    <AllQuizzes quizzes={quizzes} onUpdate={updateQuiz} onDelete={deleteQuiz}/>
                }>
                </Route>
            </Routes>
        </>
    )
}
