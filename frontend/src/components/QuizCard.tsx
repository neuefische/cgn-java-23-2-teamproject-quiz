import {Quiz} from "../model/Quiz.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {Checkbox, TextField} from "@mui/material";
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

    function handleInputAnswer(event: ChangeEvent<HTMLInputElement>) {
        const eventName=event.target.name as "answer1" | "answer2" | "answer3" | "answer4"
        setInputValue({...inputValue, [event.target.name]:{...inputValue[eventName], answer: event.target.value}})
    }

    function handleUpdateQuiz(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newQuiz: Quiz = {
            id: props.quiz.id,
            question: inputValue.question,
            answers: [
                {
                    answer: inputValue.answer1.answer,
                    rightAnswer: inputValue.answer1.rightAnswer
                }, {
                    answer: inputValue.answer2.answer,
                    rightAnswer: inputValue.answer2.rightAnswer
                }, {
                    answer: inputValue.answer3.answer,
                    rightAnswer: inputValue.answer3.rightAnswer
                }, {
                    answer: inputValue.answer4.answer,
                    rightAnswer: inputValue.answer4.rightAnswer
                }
            ]
        }
        props.onUpdate(newQuiz)
        handleEditMode()
        toast.info("Updated Quiz!",  {
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

    function handleDeleteQuiz() {
        props.onDelete(props.quiz)
        toast.error("Quiz is deleted!",  {
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


    return (
        <div className={"quizcard-container"}>
            {!editMode ?
                <>
                    <p> {props.quiz.question}</p>
                    {props.quiz.answers.map(answer => {
                        return (
                            <p key={answer.answer}>{answer.answer} {answer.rightAnswer ? "✅":"❌"}</p>
                        )
                    })}
                    <button onClick={handleEditMode}>Edit</button>
                </>
                :
                <>
                    <form className={"editmode-card-container"} onSubmit={handleUpdateQuiz}>
                        <h4>Edit:</h4>
                        <div>
                        <TextField
                            onChange={handleInputQuestion}
                            value={inputValue.question}
                            id="outlined-basic"
                            color={"success"}
                            label="Question"
                            variant="outlined"
                            required
                        />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer1.answer}
                            name={"answer1"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer1"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer1.rightAnswer}
                                onChange={()=> setInputValue({...inputValue, answer1: {...inputValue.answer1, rightAnswer: !inputValue.answer1.rightAnswer}})}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer2.answer}
                            name={"answer2"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer2"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer2.rightAnswer}
                                onChange={()=> setInputValue({...inputValue, answer2: {...inputValue.answer2, rightAnswer: !inputValue.answer2.rightAnswer}})}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer3.answer}
                            name={"answer3"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer3"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer3.rightAnswer}
                                onChange={()=> setInputValue({...inputValue, answer3: {...inputValue.answer3, rightAnswer: !inputValue.answer3.rightAnswer}})}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer4.answer}
                            name={"answer4"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer4"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer4.rightAnswer}
                                onChange={()=> setInputValue({...inputValue, answer4: {...inputValue.answer4, rightAnswer: !inputValue.answer4.rightAnswer}})}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
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
