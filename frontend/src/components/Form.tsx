import {FormEvent, useEffect, useState} from "react";
import {GameQuiz, DtoQuiz} from "../model/Quiz.tsx";
import { ArrowBack} from "@mui/icons-material";
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import delay from 'delay';
import {Checkbox, FormHelperText, IconButton, TextField} from "@mui/material";
import {InputValidationAnswer, InputValidationQuestion} from "./InputValidation.tsx";

type Props = {
    getAll: () => void;
    onAdd: (data: DtoQuiz) => void;
}

export default function Form(props: Props) {
    const allValidations: boolean[] = []
    const [errorMessageAnswer, setErrorMessageAnswer] = useState<string | undefined>(undefined)
    const [errorMessageQuestion, setErrorMessageQuestion] = useState<string | undefined>(undefined)

    const [inputValue, setInputValue] = useState<GameQuiz>(
        {
            id: "neu",
            question: "", answers: [
                {id: 1, answerText: "", rightAnswer: false},
                {id: 2, answerText: "", rightAnswer: false},
                {id: 3, answerText: "", rightAnswer: false},
                {id: 4, answerText: "", rightAnswer: false},
            ]
        })

    const navigate = useNavigate();

    useEffect(handleQuestionValidation, [inputValue.question])
    useEffect(handleAnswerValidation, [inputValue.answers])

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
            delayedExecution();
            props.onAdd(inputValue);
        }
    }

    const delayedExecution = async () => {
        toast.success("Success", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        })
        await delay(2000); // Delay of 2000 milliseconds (2 seconds)
        navigate("/all-quizzes")
    };

    function handleQuestionValidation() {
        const error = InputValidationQuestion(inputValue.question)
        setErrorMessageQuestion(error)
        allValidations[0] = error === undefined;
    }

    function handleAnswerValidation() {
        const error = InputValidationAnswer(inputValue)
        setErrorMessageAnswer(error)
        allValidations[1] = error === undefined;
    }

    return (<>
            <Link to={"/all-quizzes"}>
                <IconButton className={"back-button-form"} color={"secondary"}>
                    <ArrowBack/>
                </IconButton>
            </Link>
            <h1>Add a Quiz:</h1>
            <form className={"form-container"} onSubmit={handleSubmit}>
                <TextField
                    onChange={e => setInputValue({...inputValue, question: e.target.value})}
                    value={inputValue.question}
                    id="outlined-basic"
                    color={"success"}
                    label="Question"
                    variant="outlined"
                    required
                />
                <div className={"validation-container"}>
                    <p>{errorMessageQuestion}</p>
                </div>
                <div className={"form_helper-container"}>
                    <FormHelperText>Write answers</FormHelperText>
                    <FormHelperText>Mark as true</FormHelperText>
                </div>
                <div>
                    {inputValue.answers.map(answer => {
                        return <div key={answer.id + "a"} className={"form_answer_container"}>
                            <TextField
                                onChange={e => {
                                    setInputValue({
                                        ...inputValue,
                                        answers: inputValue.answers.map(a => {
                                            if (a.id === answer.id) {
                                                return {...a, answerText: e.target.value}
                                            }
                                            return a
                                        })
                                    })
                                }}
                                value={answer.answerText}
                                id="outlined-basic"
                                label={"Answer" + answer.id}
                                size={"small"}
                                fullWidth
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
                </div>
                <div className={"validation-container"}>
                    <p>{errorMessageAnswer}</p>
                </div>
                <section>
                    <button>Add Quiz to Collection</button>
                </section>
            </form>
            <ToastContainer/>
        </>

    );
}
