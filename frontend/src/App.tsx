import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Form from './components/Form.tsx';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NewQuiz, QuizModel} from "./model/QuizModel.ts";

export default function App() {
    const [quizzes, setQuizzes] = useState<QuizModel[]>([]);

    const onAddQuiz = (newQuiz: NewQuiz) => {
        axios
            .post('/api/quiz', newQuiz)
            .then(function (response) {
                console.log(response);
                setQuizzes(response.data);
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Could not send request: ' + error);
            });
    };

    useEffect(() => {
        axios
            .get('/api/quiz')
            .then(function (response) {
                setQuizzes(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    if (!quizzes) {
        return <h1>... loading</h1>;
    }

    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <div>
                <Form onAddQuiz={onAddQuiz}/>
            </div>
            <div>
                {quizzes.map((quiz) => {
                    return (
                        <div key={quiz.id}>
                            <p>{quiz.question}</p>
                            <p>{quiz.answer}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
