import {Quiz} from "../model/Quiz.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {TextField} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';

type Props = {
    quiz: Quiz,
    onUpdate: (quiz: Quiz) => void,
    onDelete: (quiz: Quiz) => void
}

function QuizCard(props: Props) {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState({
        question: props.quiz.question,
        answer: props.quiz.answer
    })

    function handleEditMode() {
        setEditMode(!editMode)
    }

    function handleInputQuestion(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, question: event.target.value})
    }

    function handleInputAnswer(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, answer: event.target.value})
    }

    function handleUpdateQuiz(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newQuiz: Quiz = {
            id: props.quiz.id,
            question: inputValue.question,
            answer: inputValue.answer,
        }
        props.onUpdate(newQuiz)
        handleEditMode()
        toast.info("Updated Quiz!",  {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }

    function handleDeleteQuiz() {
        props.onDelete(props.quiz)
        toast.error("Quiz is deleted!",  {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
    }


    return (
        <div className={"quizcard-container"}>
            {!editMode ?
                <>
                    <p> {props.quiz.question}</p>
                    <p> {props.quiz.answer}</p>
                    <button onClick={handleEditMode}>Edit</button>
                </>
                :
                <>
                    <form className={"editmode-card-container"} onSubmit={handleUpdateQuiz}>
                        <h4>Edit:</h4>
                        <TextField
                            onChange={handleInputQuestion}
                            value={inputValue.question}
                            id="outlined-basic"
                            color={"success"}
                            label="Question"
                            variant="outlined"
                            required
                        />
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer"
                            variant="outlined"
                            required
                        />
                        <section className={"editmode-button-container"}>
                            <button className={"editmode-card-button editmode-button"}>Save Changes</button>
                        </section>
                    </form>
                    <section className={"editmode-button-container"}>
                        <button className={"editmode-button"} onClick={handleDeleteQuiz}>Delete</button>
                    </section>
                </>
            }
            <ToastContainer/>
        </div>
    );
}

export default QuizCard;
