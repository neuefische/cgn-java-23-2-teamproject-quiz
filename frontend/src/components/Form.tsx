import {FormEvent, useState} from "react";
import {DtoQuiz} from "../model/Quiz.tsx";
import {AddCircle, ArrowBack} from "@mui/icons-material";
import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import delay from 'delay';
import {Checkbox, FormHelperText, IconButton, TextField} from "@mui/material";


type Props = {
    getAll: () => void;
    onAdd: (data: DtoQuiz) => void;
}

export default function Form(props: Props) {
    const [inputValue, setInputValue] = useState({
        question: "",

        answer1: {answerText: "", rightAnswer: false},
        answer2: {answerText: "", rightAnswer: false},
        answer3: {answerText: "", rightAnswer: false},
        answer4: {answerText: "", rightAnswer: false}
    })

    const navigate = useNavigate();
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        delayedExecution();
        const newQuiz: DtoQuiz = {
            question: inputValue.question,
            answers: [
                {
                    answerText: inputValue.answer1.answerText,
                    rightAnswer: inputValue.answer1.rightAnswer
                },{
                    answerText: inputValue.answer2.answerText,
                    rightAnswer: inputValue.answer2.rightAnswer
                },{
                    answerText: inputValue.answer3.answerText,
                    rightAnswer: inputValue.answer3.rightAnswer
                },{
                    answerText: inputValue.answer4.answerText,
                    rightAnswer: inputValue.answer4.rightAnswer
                },
            ]
        }
        props.onAdd(newQuiz);
        setInputValue({
            question: "",

            answer1: {answerText: "", rightAnswer: false},
            answer2: {answerText: "", rightAnswer: false},
            answer3: {answerText: "", rightAnswer: false},
            answer4: {answerText: "", rightAnswer: false}
        })
    }


    const delayedExecution = async () => {
        toast.success("Success",  {
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
                <div className={"form_helper-container"}>
                    <FormHelperText>Write answers</FormHelperText>
                    <FormHelperText>Mark as true</FormHelperText>
                </div>
                <div className={"form_answer_container"}>
                    <TextField
                        onChange={e => setInputValue({...inputValue, answer1: {...inputValue.answer1, answerText: e.target.value}})}
                        value={inputValue.answer1.answerText}
                        id="outlined-basic"
                        label="Answer1"
                        size={"small"}
                        fullWidth
                        variant="outlined"
                        required
                    />
                    <Checkbox
                        checked={inputValue.answer1.rightAnswer}
                        onChange={()=> setInputValue({...inputValue, answer1: {...inputValue.answer1, rightAnswer: !inputValue.answer1.rightAnswer}})}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>

                <div className={"form_answer_container"}>
                    <TextField
                        onChange={e => setInputValue({...inputValue, answer2: {...inputValue.answer2, answerText: e.target.value}})}
                        value={inputValue.answer2.answerText}
                        id="outlined-basic"
                        label="Answer2"
                        size={"small"}
                        fullWidth
                        variant="outlined"
                        required
                    />
                    <Checkbox
                        checked={inputValue.answer2.rightAnswer}
                        onChange={()=> setInputValue({...inputValue, answer2: {...inputValue.answer2, rightAnswer: !inputValue.answer2.rightAnswer}})}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                <div className={"form_answer_container"}>
                    <TextField
                        onChange={e => setInputValue({...inputValue, answer3: {...inputValue.answer3, answerText: e.target.value}})}
                        value={inputValue.answer3.answerText}
                        id="outlined-basic"
                        label="Answer3"
                        size={"small"}
                        fullWidth
                        variant="outlined"
                        required
                    />
                    <Checkbox
                        checked={inputValue.answer3.rightAnswer}
                        onChange={()=> setInputValue({...inputValue, answer3: {...inputValue.answer3, rightAnswer: !inputValue.answer3.rightAnswer}})}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                <div className={"form_answer_container"}>
                    <TextField
                        onChange={e => setInputValue({...inputValue, answer4: {...inputValue.answer4, answerText: e.target.value}})}
                        value={inputValue.answer4.answerText}
                        id="outlined-basic"
                        label="Answer4"
                        size={"small"}
                        fullWidth
                        variant="outlined"
                        required
                    />
                    <Checkbox
                        checked={inputValue.answer4.rightAnswer}
                        onChange={()=> setInputValue({...inputValue, answer4: {...inputValue.answer4, rightAnswer: !inputValue.answer4.rightAnswer}})}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                    <section>
                    <IconButton type={"submit"} color="primary" aria-label="add quiz">
                        <AddCircle/>
                    </IconButton>
                </section>
            </form>
            <ToastContainer />
    </>

    );
}
