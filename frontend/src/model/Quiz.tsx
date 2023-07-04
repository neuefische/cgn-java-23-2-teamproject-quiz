export type Answer={
    answer: string,
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