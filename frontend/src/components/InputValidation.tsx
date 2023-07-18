import {GameQuiz} from "../model/Quiz.tsx";

export function InputValidationAnswer(inputValue: GameQuiz){
    let errorLength = false
    let errorBlank = false

    inputValue.answers.forEach(answer => {
        if(!(answer.answerText.length < 256 && answer.answerText.length > 0))
            errorLength = true
    });
    if(errorLength)
        return "All answers should have at least 1 and maximum 256 characters"
    inputValue.answers.forEach(answer => {
        if(!(answer.answerText.trim().length !== 0))
            errorBlank = true
    });
    if(errorBlank)
        return "All answers must contain characters (not just blank)"
    return undefined
}

export function InputValidationQuestion(value: string){
    if(!(value.length>4 && value.length<256))
        return "The question should have at least 5 and maximum 256 characters"
    if(!(value.trim().length !== 0))
        return "Question must contain characters (not just blank)"
    return undefined
}
