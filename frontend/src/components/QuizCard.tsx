import {Answer, GameAnswer, GameQuiz, Quiz} from "../model/Quiz.tsx";
import {FormEvent, useState} from "react";
import {Checkbox, TextField} from "@mui/material";
import {ToastContainer, toast} from 'react-toastify';

type Props = {
    quiz: GameQuiz,
    onUpdate: (quiz: Quiz) => void,
    onDelete: (quiz: Quiz) => void
}

function QuizCard(props: Props) {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState<GameQuiz>(getQuiz)
    const allValidations: boolean[] = []

    function getQuiz() {
        const changeQuiz: GameQuiz = {
            id: props.quiz.id,
            question: props.quiz.question,
            answers: [],
        }
        props.quiz.answers.map(answer => {
            const answerObjekt: GameAnswer = {
                id: changeQuiz.answers.length,
                answerText: answer.answerText,
                rightAnswer: answer.rightAnswer,
            }
            changeQuiz.answers.push(answerObjekt)
        })
        return changeQuiz
    }

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
        if (allValidations.includes(false)) {
            toast.error("Input values are not valid!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else {
            const newQuiz: Quiz = {
                id: props.quiz.id,
                question: inputValue.question,
                answers: []
            }
            inputValue.answers.map(answer => {
                const answerObjekt: Answer = {
                    answerText: answer.answerText,
                    rightAnswer: answer.rightAnswer,
                }
                newQuiz.answers.push(answerObjekt)
            })

            props.onUpdate(newQuiz)
            handleEditMode()
            toast.info("Updated Quiz!", {
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
    }

    function handleDeleteQuiz() {
        props.onDelete(props.quiz)
        toast.error("Quiz is deleted!", {
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
                            <p key={answer.answerText}>{answer.answerText} {answer.rightAnswer ? "✅" : "❌"}</p>
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
                                onChange={e => setInputValue({...inputValue, question: e.target.value})}
                                value={inputValue.question}
                                id="outlined-basic"
                                color={"success"}
                                label="Question"
                                variant="outlined"
                                required
                            />
                        </div>
                        {inputValue.answers.map(answer => {
                            return <div>
                                <TextField
                                    onChange={e => {
                                        setInputValue({
                                            ...inputValue,
                                            answers: inputValue.answers.map(a => {
                                                if (a.id === answer.id) {
                                                    return {...a, answerText: e.target.value}
                                                }
                                                return a
                                            })})}}
                                    value={answer.answerText}
                                    name={""+answer.id}
                                    id="outlined-basic"
                                    color={"success"}
                                    label={"Answer" + answer.id}
                                    variant="outlined"
                                    required
                                />
                                <Checkbox
                                    checked={answer.rightAnswer}
                                    onChange={() => setInputValue({
                                        ...inputValue,
                                        answers: inputValue.answers.map(a => {
                                            if (a.id === answer.id) {
                                                return {...a, rightAnswer: !answer.rightAnswer}
                                            }
                                            return a
                                        })
                                    })}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                            </div>
                        })}

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
