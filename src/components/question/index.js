
import { useState } from 'react';
import '../../styles/question.css'


const Question = ({ questions }) =>{

    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false)

    const handleNextQuestion =() =>{
        setCurrentQuestion(currentQuestion +1)
        setIsCorrect(false)
    }

    const handleQuestionAnswer = (answer) =>{
        setAnswers(prev => [...prev, answer])

        //if answer is correct:
        if(questions[currentQuestion].correctAnswer === answer){
           setIsCorrect(true);
           setCurrentScore(prev => prev+1)
        }else{
            setIsCorrect(false)
        }

    }

    const handleQuizRestart =() =>{
        setAnswers([])
        setCurrentScore(0)
        setCurrentQuestion(0)

    }

    const isQuizComplete =  
    currentQuestion === questions.length-1  && 
    answers.length === questions.length;

    const feedback = isCorrect ?
    'Your Answer is Correct':
    answers[currentQuestion] && !isCorrect?
    'Your Answer is Incorrect':''

    return (
        <>
           <div className='container'>
              <div className='score'>Score: {currentScore} / {questions.length}</div>
              <div className='question-title'>
                {isQuizComplete? 
                `You finished the quiz !`: 
                questions[currentQuestion].question}
              </div>

              {!isQuizComplete
                   &&
              <div className='answers-buttons'>
                {
                    questions[currentQuestion].options.map((option, index) =>(
                        <button 
                            className='button' 
                            key={index}
                            onClick={()=> handleQuestionAnswer(option)}
                            disabled={answers[currentQuestion]}
                            style={{
                                backgroundColor: answers[currentQuestion] ===option? '#000':'',
                                color: answers[currentQuestion] ===option? '#fff':''
                            }}
                        >
                            {option}
                        </button>
                    ))

                }

              </div>
              }

              {
                !isQuizComplete
                  &&
                <div style={{
                    margin: '20px',
                    color:  isCorrect? 'green':'red'
                }}>
                    {feedback}
                </div>
               }

                {currentQuestion < questions.length-1   
                    &&
                <button 
                  className='next-question-button'
                  onClick={handleNextQuestion}
                >
                    Next Question
                </button>}


                {
                    isQuizComplete
                       &&
                    <button 
                        className='next-question-button'
                        onClick={handleQuizRestart}
                    >
                        Restart the quiz
                    </button>
   
                }
                
              

           </div>
        </>
    )
}

export default Question