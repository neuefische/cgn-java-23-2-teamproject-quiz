import QuizCard from "./QuizCard.tsx";
import {Quiz} from "../model/Quiz.tsx";
import {IconButton} from "@mui/material";
import {AddCircle, ArrowBack} from "@mui/icons-material";
import {Link} from "react-router-dom";

type Props = {
    quizzes: Quiz[]
    onUpdate: (updateQuiz: Quiz) => void,
    onDelete: (deleteQuiz: Quiz) => void
}

function AllQuizzes(props: Props) {
    if (!props.quizzes)
        return <h1> ... loading </h1>
    return (
        <main>
            <Link to={"/"}>
                <IconButton className={"back-button"} color={"secondary"}>
                    <ArrowBack/>
                </IconButton>
            </Link>
            <section className={"allquizzes-header-container"}>
                <h1 className={"allquizzes-header"}>All Quizzes:</h1>
                <Link to={"/all-quizzes/add"}>
                    <IconButton className={"add-button"} type={"submit"} color="primary" aria-label="add quiz">
                        <AddCircle />
                    </IconButton>
                </Link>
            </section>

            {props.quizzes.map(quiz => {
                return <QuizCard key={quiz.id} quiz={quiz} onUpdate={props.onUpdate} onDelete={props.onDelete}/>
            })}
        </main>
    );
}

export default AllQuizzes;
