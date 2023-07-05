import {FormEvent, useState} from "react";
import {DtoQuiz} from "../model/Quiz.tsx";
import {Checkbox, IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";


type Props = {
    getAll: () => void;
    onAdd: (data: DtoQuiz) => void;
}

export default function Form(props: Props) {
    const [inputValue, setInputValue] = useState({
        question: "",

        answer1: {answer: "", rightAnswer: false},
        answer2: {answer: "", rightAnswer: false},
        answer3: {answer: "", rightAnswer: false},
        answer4: {answer: "", rightAnswer: false}
    })

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newQuiz: DtoQuiz = {
            question: inputValue.question,
            answers: [
                {
                    answer: inputValue.answer1.answer,
                    rightAnswer: inputValue.answer1.rightAnswer
                },{
                    answer: inputValue.answer2.answer,
                    rightAnswer: inputValue.answer2.rightAnswer
                },{
                    answer: inputValue.answer3.answer,
                    rightAnswer: inputValue.answer3.rightAnswer
                },{
                    answer: inputValue.answer4.answer,
                    rightAnswer: inputValue.answer4.rightAnswer
                },
            ]
        }
        props.onAdd(newQuiz);
        setInputValue({
            question: "",

            answer1: {answer: "", rightAnswer: false},
            answer2: {answer: "", rightAnswer: false},
            answer3: {answer: "", rightAnswer: false},
            answer4: {answer: "", rightAnswer: false}
        })
    }

    return (
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
            <div>
            <TextField
                onChange={e => setInputValue({...inputValue, answer1: {...inputValue.answer1, answer: e.target.value}})}
                value={inputValue.answer1.answer}
                id="outlined-basic"
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
                onChange={e => setInputValue({...inputValue, answer2: {...inputValue.answer2, answer: e.target.value}})}
                value={inputValue.answer2.answer}
                id="outlined-basic"
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

                <TextField
                onChange={e => setInputValue({...inputValue, answer3: {...inputValue.answer3, answer: e.target.value}})}
                value={inputValue.answer3.answer}
                id="outlined-basic"
                label="Answer3"
                variant="outlined"
                required
            /><TextField
                onChange={e => setInputValue({...inputValue, answer4: {...inputValue.answer4, answer: e.target.value}})}
                value={inputValue.answer4.answer}
                id="outlined-basic"
                label="Answer4"
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
