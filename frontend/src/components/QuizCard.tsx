import {Quiz} from "../model/Quiz.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    quiz: Quiz,
    onUpdate: (quiz: Quiz) => void,
    onDelete: (quiz: Quiz) => void
}

function QuizCard(props: Props) {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState({
        question: props.quiz.question,

        answer1:props.quiz.answers[0],
        answer2:props.quiz.answers[1],
        answer3:props.quiz.answers[2],
        answer4:props.quiz.answers[3],
    })

    function handleEditMode() {
        setEditMode(!editMode)
    }

    function handleInputQuestion(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, question: event.target.value})
    }

    function handleInputAnswer1(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, answer1:{...inputValue.answer1, answer: event.target.value}})
    }
    function handleInputAnswer2(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, answer2:{...inputValue.answer2, answer: event.target.value}})
    }
    function handleInputAnswer3(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, answer3:{...inputValue.answer3, answer: event.target.value}})
    }
    function handleInputAnswer4(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, answer4:{...inputValue.answer4, answer: event.target.value}})
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
    }

    function handleDeleteQuiz() {
        props.onDelete(props.quiz)
    }


    return (
        <div className={"quizcard-container"}>
            {!editMode ?
                <>
                    <p> {props.quiz.question}</p>
                    <p> {props.quiz.answers[0].answer}</p>
                    <p> {props.quiz.answers[1].answer}</p>
                    <p> {props.quiz.answers[2].answer}</p>
                    <p> {props.quiz.answers[3].answer}</p>
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
                            value={inputValue.answer1.answer}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer"
                            variant="outlined"
                            required
                        />

                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer2.answer}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer"
                            variant="outlined"
                            required
                        />

                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer3.answer}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer"
                            variant="outlined"
                            required
                        />

                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer4.answer}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer"
                            variant="outlined"
                            required
                        />
                        <section className={"editmode-button-container"}>
                            <button className={"editmode-card-button editmode-button"}>Save Changes</button>
                            <button className={"editmode-button"} onClick={handleDeleteQuiz}>Delete</button>
                        </section>
                    </form>
                </>
            }
        </div>
    );
}

export default QuizCard;