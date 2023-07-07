import {FormEvent, useEffect, useState} from "react";
import {DtoQuiz} from "../model/Quiz.tsx";
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import delay from 'delay';


type Props = {
    getAll: () => void;
    onAdd: (data: DtoQuiz) => void;
}

export default function Form(props: Props) {
    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")

    const navigate = useNavigate();
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        delayedExecution();
        const newQuiz: DtoQuiz = {
            question: question,
            answer: answer,
        }
        props.onAdd(newQuiz);
        setQuestion("")
        setAnswer("")

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
            <h1>Add a Quiz:</h1>
            <form className={"form-container"} onSubmit={handleSubmit}>
                <TextField
                    onChange={e => setQuestion(e.target.value)}
                    value={question}
                    id="outlined-basic"
                    color={"success"}
                    label="Question"
                    variant="outlined"
                    required
                />
                <TextField
                    onChange={e => setAnswer(e.target.value)}
                    value={answer}
                    id="outlined-basic"
                    label="Answer"
                    variant="outlined"
                    required
                />
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
