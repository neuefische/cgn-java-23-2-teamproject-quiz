import {Answer, GameAnswer, GameQuiz, Quiz} from "../model/Quiz.tsx";
import {FormEvent, useEffect, useState} from "react";
import {Checkbox, TextField} from "@mui/material";
import {ToastContainer, toast} from 'react-toastify';
import {InputValidationAnswer, InputValidationQuestion} from "./InputValidation.tsx";
import {brown} from "@mui/material/colors";

type Props = {
    quiz: GameQuiz,
    onUpdate: (quiz: Quiz) => void,
    onDelete: (quiz: Quiz) => void
}

function QuizCard(props: Props) {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState<GameQuiz>(getQuiz)
    const allValidations: boolean[] = []
    const [errorMessageAnswer, setErrorMessageAnswer] = useState<string | undefined>(undefined)
    const [errorMessageQuestion, setErrorMessageQuestion] = useState<string | undefined>(undefined)

    useEffect(handleQuestionValidation, [inputValue.question])
    useEffect(handleAnswerValidation, [inputValue.answers])

    function getQuiz() {
        const changeQuiz: GameQuiz = {
            id: props.quiz.id,
            question: props.quiz.question,
            answers: [],
        }
        props.quiz.answers.forEach(answer => {
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
    function handleQuestionValidation() {
        const error: string|undefined = InputValidationQuestion(inputValue.question)
        setErrorMessageQuestion(error)
        allValidations[0] = error === undefined;
    }
    function handleAnswerValidation() {
        const error: string|undefined = InputValidationAnswer(inputValue)
        setErrorMessageAnswer(error)
        allValidations[1] = error === undefined;
    }

    return (<>
        <div className={"quizcard-container"}>
            {!editMode ?
                <>
                    <h3> {props.quiz.question}</h3>
                    <div className={"answers-display-container"}>
                        {props.quiz.answers.map(answer => {
                            return (
                                <div className={"answers-display"}>
                                    <p key={answer.id}>{answer.answerText} {answer.rightAnswer ? "✅" : "❌"}</p>
                                </div>
                            )
                        })}
                    </div>

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
                                multiline
                                maxRows={4}
                                required
                                fullWidth
                            />
                        </div>
                        <div className={"validation-container"}>
                            <p>{errorMessageQuestion}</p>
                        </div>
                        {inputValue.answers.map(answer => {
                            return <div className={"editmode-answer-container"} key={answer.id}>
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
                                    label={"Answer" + (answer.id + 1)}
                                    variant="outlined"
                                    size={"small"}
                                    fullWidth
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
                                    sx={{
                                        color: brown[600],
                                        '&.Mui-checked': {
                                            color: brown[600],
                                        }
                                    }}
                                />
                            </div>
                        })}

                        <div className={"validation-container"}>
                            <p>{errorMessageAnswer}</p>
                        </div>
                        <section className={"editmode-button-container"}>
                            <button className={"editmode-button"}>Save Changes</button>
                        </section>
                    </form>
                    <section className={"editmode-button-container"}>
                        <button className={"editmode-button"} onClick={handleDeleteQuiz}>Delete</button>
                    </section>
                </>
            }
            <ToastContainer/>
        </div>
        </>
    );
}

export default QuizCard;
