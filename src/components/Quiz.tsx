import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import Question from './Question';
import AnswerOption from './AnswerOption';

const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer !== null) {
      quizCore.answerQuestion(selectedAnswer);
    }

    if (quizCore.hasNextQuestion()) {
      quizCore.nextQuestion();
      setCurrentQuestion(quizCore.getCurrentQuestion());
      setSelectedAnswer(null); // Reset selected answer
    } else {
      // No more questions
      setScore(quizCore.getScore());
      setIsCompleted(true);
    }
  };

  const handleSubmitClick = (): void => {
    if (selectedAnswer !== null) {
      quizCore.answerQuestion(selectedAnswer);
    }

    setScore(quizCore.getScore());
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      {currentQuestion && (
        <>
          <Question text={currentQuestion.question} />
          <h3>Answer Options:</h3>
          <ul>
            {currentQuestion.options.map((option) => (
              <AnswerOption
                key={option}
                option={option}
                selected={selectedAnswer === option}
                onSelect={handleOptionSelect}
              />
            ))}
          </ul>
          <h3>Selected Answer:</h3>
          <p>{selectedAnswer ?? 'No answer selected'}</p>

          {/* Button logic */}
          {quizCore.hasNextQuestion() ? (
            <button onClick={handleButtonClick} disabled={selectedAnswer === null}>
              Next Question
            </button>
          ) : (
            <button onClick={handleSubmitClick} disabled={selectedAnswer === null}>
              Submit
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
