import {FormEvent, useState} from "react";
import {DtoQuiz} from "../model/Quiz.tsx";

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
        <form onSubmit={handleSubmit}>
            <label>Question:</label>
            <input onChange={e => setQuestion(e.target.value)} value={question}/>
            <label>Answer:</label>
            <input onChange={e => setAnswer(e.target.value)} value={answer}/>
            <button>Add Quiz</button>
        </form>
    );
}
