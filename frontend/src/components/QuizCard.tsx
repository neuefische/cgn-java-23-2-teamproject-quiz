import {Quiz} from "../model/Quiz.tsx";
import {ChangeEvent, FormEvent, useState} from "react";
import {Checkbox, TextField} from "@mui/material";

type Props = {
    quiz: Quiz,
    onUpdate: (quiz: Quiz) => void,
    onDelete: (quiz: Quiz) => void
}

function QuizCard(props: Props) {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState({
        question: props.quiz.question,

        answer1:props.quiz.answers[0],
        answer2:props.quiz.answers[1],
        answer3:props.quiz.answers[2],
        answer4:props.quiz.answers[3],
    })

    function handleEditMode() {
        setEditMode(!editMode)
    }

    function handleInputQuestion(event: ChangeEvent<HTMLInputElement>) {
        setInputValue({...inputValue, question: event.target.value})
    }

    function handleInputAnswer(event: ChangeEvent<HTMLInputElement>) {
        const eventName=event.target.name as "answer1" | "answer2" | "answer3" | "answer4"
        setInputValue({...inputValue, [event.target.name]:{...inputValue[eventName], answer: event.target.value}})
    }

    function handleUpdateQuiz(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const newQuiz: Quiz = {
            id: props.quiz.id,
            question: inputValue.question,
            answers: [
                {
                    answer: inputValue.answer1.answer,
                    rightAnswer: inputValue.answer1.rightAnswer
                }, {
                    answer: inputValue.answer2.answer,
                    rightAnswer: inputValue.answer2.rightAnswer
                }, {
                    answer: inputValue.answer3.answer,
                    rightAnswer: inputValue.answer3.rightAnswer
                }, {
                    answer: inputValue.answer4.answer,
                    rightAnswer: inputValue.answer4.rightAnswer
                }
            ]
        }
        props.onUpdate(newQuiz)
        handleEditMode()
    }

    function handleDeleteQuiz() {
        props.onDelete(props.quiz)
    }


    return (
        <div className={"quizcard-container"}>
            {!editMode ?
                <>
                    <p> {props.quiz.question}</p>
                    <p> {props.quiz.answers[0].answer}</p>
                    <p> {props.quiz.answers[1].answer}</p>
                    <p> {props.quiz.answers[2].answer}</p>
                    <p> {props.quiz.answers[3].answer}</p>
                    <button onClick={handleEditMode}>Edit</button>
                </>
                :
                <>
                    <form className={"editmode-card-container"} onSubmit={handleUpdateQuiz}>
                        <h4>Edit:</h4>
                        <div>
                        <TextField
                            onChange={handleInputQuestion}
                            value={inputValue.question}
                            id="outlined-basic"
                            color={"success"}
                            label="Question"
                            variant="outlined"
                            required
                        />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer1.answer}
                            name={"answer1"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer1"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer1.rightAnswer}
                                onChange={handleInputRightAnswer}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer2.answer}
                            name={"answer2"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer2"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer2.rightAnswer}
                                onChange={handleInputRightAnswer}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer3.answer}
                            name={"answer3"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer3"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer3.rightAnswer}
                                onChange={handleInputRightAnswer}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <div>
                        <TextField
                            onChange={handleInputAnswer}
                            value={inputValue.answer4.answer}
                            name={"answer4"}
                            id="outlined-basic"
                            color={"success"}
                            label="Answer4"
                            variant="outlined"
                            required
                        />
                            <Checkbox
                                checked={inputValue.answer4.rightAnswer}
                                onChange={handleInputRightAnswer}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </div>
                        <section className={"editmode-button-container"}>
                            <button className={"editmode-card-button editmode-button"}>Save Changes</button>
                            <button className={"editmode-button"} onClick={handleDeleteQuiz}>Delete</button>
                        </section>
                    </form>
                </>
            }
        </div>
    );
}

export default QuizCard;