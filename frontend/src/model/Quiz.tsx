export type Answer={
    answerText: string,
    rightAnswer: boolean
}

export type Quiz= {
    id: string,
    question: string,
    answers: Answer[],
}

export type DtoQuiz = {
    question: string,
    answers: Answer[],
}
export type GameQuiz = {
    id: string,
    question: string,
    answers : GameAnswer[],
}
export type GameAnswer={
    id: number,
    answerText: string,
    rightAnswer: boolean,
}