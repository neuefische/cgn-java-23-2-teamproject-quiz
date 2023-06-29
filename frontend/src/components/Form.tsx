import {ChangeEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type Props = {
    onAddQuiz: (newQuiz: { question: string; answer: string }) => void;
};

export default function Form({onAddQuiz}: Props) {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    function handleInputQuestion(event: ChangeEvent<HTMLInputElement>) {
        setQuestion(event.target.value);
    }

    function handleInputAnswer(event: ChangeEvent<HTMLInputElement>) {
        setAnswer(event.target.value);
    }

    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        const newQuiz = {
            question: question,
            answer: answer,
        };

        onAddQuiz(newQuiz);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Question:</label>
            <TextField
                type="text"
                onChange={handleInputQuestion}
                variant="filled"
                label="Question"
                value={question}
            />
            <label>Answer:</label>
            <TextField
                type="text"
                onChange={handleInputAnswer}
                variant="outlined"
                label="Answer"
                value={answer}
            />
            <Button variant="outlined" color="success" type="submit">
                Add Quiz
            </Button>
        </form>
    );
}
