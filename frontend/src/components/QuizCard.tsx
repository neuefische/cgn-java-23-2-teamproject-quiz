import {Quiz} from "../model/Quiz.tsx";
import {FormEvent, useState} from "react";
import {TextField} from "@mui/material";

type Props = {
    quiz: Quiz,
    onUpdate: (quiz: Quiz) => void,
    onDelete: (quiz: Quiz) => void
}
function QuizCard(props: Props) {
    const[editMode, setEditMode] = useState(false)
    const[inputValue, setInputValue] = useState({
        question: props.quiz.question,
        answer: props.quiz.answer
    })
    function handleEditMode(){
        setEditMode(!editMode)
    }

    function handleInputQuestion(event:FormEvent<HTMLInputElement> ){
        setInputValue({...inputValue, question: event.currentTarget.value})
    }

    function handleInputAnswer(event:FormEvent<HTMLInputElement> ){
        setInputValue({...inputValue, answer: event.currentTarget.value})
    }
    function handleUpdateQuiz(event: FormEvent<HTMLFormElement>){
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
            <p> {props.quiz.answer}</p>
            <button onClick={handleEditMode}>Edit</button>
                </>
            :
                <>
                    <form className={"editmode-card-container"} onSubmit={handleUpdateQuiz}>
                        <h4>Edit:</h4>
                        <TextField
                            onInput={handleInputQuestion}
                            value={inputValue.question}
                            id="outlined-basic"
                            color={"success"}
                            label="Question"
                            variant="outlined"
                            required
                        />
                        <TextField
                            onInput={handleInputAnswer}
                            value={inputValue.answer}
                            id="outlined-basic"
                            color={"success"}
                            label="Question"
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