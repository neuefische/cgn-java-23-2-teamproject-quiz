import {FormEvent} from "react";

type Props={
    onSubmit: (event:FormEvent<HTMLFormElement> )=>void,
    onQuestion: (event:FormEvent<HTMLInputElement>)=>void,
    onAnswer: (event:FormEvent<HTMLInputElement>)=>void
}
export default function Form(props: Props) {
    return (
        <form onSubmit={props.onSubmit}>
            <label>Question:</label>
            <input type={"Text"} onInput={props.onQuestion}/>
            <label>Answer:</label>
            <input type={"Text"} onInput={props.onAnswer}/>
            <button>Add Quiz</button>

        </form>
    );
}
