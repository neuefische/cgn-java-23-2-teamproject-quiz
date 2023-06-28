import './App.css'
import {FormEvent, useEffect, useState} from "react";
import {Quiz} from "./model/Quiz.tsx";
import axios from "axios";
import Form from "./components/Form.tsx";

export default function App() {
  const[quizzes, setQuizzes] = useState<Quiz[]>()
    const[question, setQuestion]=useState<string>("")
    const[answer, setAnswer]=useState<string>("")

    function handleInputQuestion(event:FormEvent<HTMLInputElement>){
      setQuestion(event.currentTarget.value)
    }
    function handleInputAnswer(event:FormEvent<HTMLInputElement>){
        setAnswer(event.currentTarget.value)
    }
    function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        const newQuiz: Quiz = {
            id: ""+quizzes.length+1,
            question: question,
            answer: answer,
        }
        axios.post("/api/quiz", newQuiz)
            .then(function (response) {
                console.log(response);
                setQuizzes(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
  useEffect(() => {
    axios.get('/api/quiz')
        .then(function (response) {
          setQuizzes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [quizzes])

    if(!quizzes)
        return <h1> ... loading </h1>
  return (
    <>
        <div>
            <Form onSubmit={handleSubmit} onQuestion={handleInputQuestion} onAnswer={handleInputAnswer}/>
        </div>
      <div>
        {quizzes?.map(quiz =>{
          return (
              <>
                <p> {quiz.question}</p>
                <p> {quiz.answer}</p>
              </>
          )
        })}
      </div>
    </>
  )
}