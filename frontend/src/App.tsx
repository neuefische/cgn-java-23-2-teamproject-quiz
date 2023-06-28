import './App.css'
import {useEffect, useState} from "react";
import {Quiz} from "./model/Quiz.tsx";
import axios from "axios";

export default function App() {
  const[quizzes, setQuizzes] = useState<Quiz[]>()

  useEffect(() => {
    axios.get('/api/quiz')
        .then(function (response) {
          setQuizzes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [])

    if(!quizzes)
        return <h1> ... loading </h1>
  return (
    <>
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