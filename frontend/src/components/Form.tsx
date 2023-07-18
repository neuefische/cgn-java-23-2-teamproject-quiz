import {FormEvent, useState} from "react";
import {GameQuiz, DtoQuiz} from "../model/Quiz.tsx";
import {AddCircle, ArrowBack} from "@mui/icons-material";
import {Link, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import delay from 'delay';
import {Checkbox, FormHelperText, IconButton, TextField} from "@mui/material";


type Props = {
    getAll: () => void;
    onAdd: (data: DtoQuiz) => void;
}

export default function Form(props: Props) {
    const allValidations: boolean[] = []
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

    function handleValidation(booleanValue: boolean, index: number) {
        if (booleanValue) {
            allValidations[index] = true
            return "green"
        } else {
            allValidations[index] = false
            return "red"
        }

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
                    <p style={{color: `${handleValidation(inputValue.question.length > 5 && inputValue.question.length < 256, 0)}`}}>The
                        question should have at least 5 and maximum 256 characters</p>
                    <p style={{color: `${handleValidation(inputValue.question.trim().length !== 0, 1)}`}}>Question must
                        contain characters (not just blank).</p>
                </div>
                <div className={"form_helper-container"}>
                    <FormHelperText>Write answers</FormHelperText>
                    <FormHelperText>Mark as true</FormHelperText>
                </div>
                <div className={"form_answer_container"}>
                    {inputValue.answers.map(answer => {
                        return <>
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
                                id="outlined-basic"
                                label= {"Answer"+answer.id}
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
                        </>
                    })}

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
                <section>
                    <IconButton type={"submit"} color="primary" aria-label="add quiz">
                        <AddCircle/>
                    </IconButton>
                </section>
            </form>
            <ToastContainer/>
        </>

    );
}
