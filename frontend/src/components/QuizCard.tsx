import {Quiz} from "../model/Quiz.tsx";
import {FormEvent, useState} from "react";
import axios from "axios";

type Props = {
    quiz: Quiz,
    onUpdate: (data: Quiz[]) => void
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

    function handleUpdateQuiz(){
        axios.put("/api/quiz", {
            id: props.quiz.id,
            question: inputValue.question,
            answer: inputValue.answer
        })
            .then(function (response) {
                console.log(response);
                props.onUpdate(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            {!editMode ?
                <>
            <p> {props.quiz.question}</p>
            <p> {props.quiz.answer}</p>
            <button onClick={handleEditMode}>Edit</button>
                </>
            :
            <form onSubmit={handleUpdateQuiz}>
                <label>Edit Question:</label>
                <input type={"Text"} value={inputValue.question} onInput={handleInputQuestion}/>
                <label>Answer:</label>
                <input type={"Text"} value={inputValue.answer} onInput={handleInputAnswer} />
                <button>Save Changes</button>
            </form>
            }
        </div>
    );
}

export default QuizCard;