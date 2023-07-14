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
    const allValidations: boolean[] = []
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
        setInputValue({...inputValue, [event.target.name]:{...inputValue[eventName], answerText: event.target.value}})
    }

    function handleUpdateQuiz(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newQuiz: Quiz = {
            id: props.quiz.id,
            question: inputValue.question,
            answers: [
                {
                    answerText: inputValue.answer1.answerText,
                    rightAnswer: inputValue.answer1.rightAnswer
                }, {
                    answerText: inputValue.answer2.answerText,
                    rightAnswer: inputValue.answer2.rightAnswer
                }, {
                    answerText: inputValue.answer3.answerText,
                    rightAnswer: inputValue.answer3.rightAnswer
                }, {
                    answerText: inputValue.answer4.answerText,
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
    function handleValidation(booleanValue: boolean, index: number) {
        if (booleanValue) {
            allValidations[index] = true
            return "green"
        } else {
            allValidations[index] = false
            return "red"
        }

    }

    return (
        <div className={"quizcard-container"}>
            {!editMode ?
                <>
                    <p> {props.quiz.question}</p>
                    {props.quiz.answers.map(answer => {
                        return (
                            <p key={answer.answerText}>{answer.answerText} {answer.rightAnswer ? "✅":"❌"}</p>
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
                        <div className={"validation-container"}>
                            <p style={{color: `${handleValidation(inputValue.question.length > 5 && inputValue.question.length < 256, 0)}`}}>The
                                question should have at least 5 and maximum 256 characters</p>
                            <p style={{color: `${handleValidation(inputValue.question.trim().length !== 0, 1)}`}}>Question must
                                contain characters (not just blank).</p>
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer1.answerText}
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
                            value={inputValue.answer2.answerText}
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
                            value={inputValue.answer3.answerText}
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
                            value={inputValue.answer4.answerText}
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
                        <div className={"validation-container"}>
                            <p style={{
                                color: `${handleValidation(
                                    (inputValue.answer1.answerText.length < 256 && inputValue.answer1.answerText.length > 0) &&
                                    (inputValue.answer2.answerText.length < 256 && inputValue.answer2.answerText.length > 0) &&
                                    (inputValue.answer3.answerText.length < 256 && inputValue.answer3.answerText.length > 0) &&
                                    (inputValue.answer4.answerText.length < 256 && inputValue.answer4.answerText.length > 0)
                                    , 2)}`
                            }}>All answers should have at least 1 and maximum 256 characters</p>
                            <p style={{
                                color: `${handleValidation(inputValue.answer1.answerText.trim().length !== 0 &&
                                    inputValue.answer2.answerText.trim().length !== 0 &&
                                    inputValue.answer3.answerText.trim().length !== 0 &&
                                    inputValue.answer4.answerText.trim().length !== 0
                                    , 3)}`
                            }}>Answers must contain characters (not just blank).</p>
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
