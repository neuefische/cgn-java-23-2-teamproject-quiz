import {FormEvent, useState} from "react";
import {DtoQuiz} from "../model/Quiz.tsx";
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";


type Props = {
    getAll: () => void;
    onAdd: (data: DtoQuiz) => void;
}

export default function Form(props: Props) {
    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newQuiz: DtoQuiz = {
            question: question,
            answer: answer,
        }
        props.onAdd(newQuiz);
        setQuestion("")
        setAnswer("")
    }

    return (
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
                <IconButton type={"submit"} color="primary" aria-label="add an alarm">
                    <AddCircle/>
                </IconButton>
            </section>

        </form>
    );
}
