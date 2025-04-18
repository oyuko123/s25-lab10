import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import Question from './Question';
import AnswerOption from './AnswerOption';

const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ question: string, selected: string | null, correct: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer !== null && currentQuestion) {
      quizCore.answerQuestion(selectedAnswer);

      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = {
        question: currentQuestion.question,
        selected: selectedAnswer,
        correct: currentQuestion.correctAnswer
      };
      setAnswers(updatedAnswers);

      quizCore.nextQuestion();
      setSelectedAnswer(null);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackClick = (): void => {
    if (currentIndex > 0) {
      quizCore.previousQuestion(); 
      const previousIndex = currentIndex - 1;
      setCurrentIndex(previousIndex);
      setSelectedAnswer(answers[previousIndex]?.selected || null);
    }
  };

  const handleSubmitClick = (): void => {
    if (selectedAnswer !== null && currentQuestion) {
      quizCore.answerQuestion(selectedAnswer);

      const updatedAnswers = [...answers];
      updatedAnswers[currentIndex] = {
        question: currentQuestion.question,
        selected: selectedAnswer,
        correct: currentQuestion.correctAnswer
      };
      setAnswers(updatedAnswers);

      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    const totalScore = answers.filter((a) => a.selected === a.correct).length;

    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {totalScore} out of {answers.length}</p>

        <h3>Review:</h3>
        <ul>
          {answers.map((a, index) => (
            <li key={index}>
              <strong>Q{index + 1}:</strong> {a.question}<br />
              <strong>Your Answer:</strong> {a.selected} {a.selected === a.correct ? '✅' : '❌'}<br />
              <strong>Correct Answer:</strong> {a.correct}
            </li>
          ))}
        </ul>
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

          <div style={{ display: 'flex', gap: '10px' }}>
            {currentIndex > 0 && (
              <button onClick={handleBackClick}>
                Back
              </button>
            )}
            {quizCore.hasNextQuestion() ? (
              <button onClick={handleButtonClick} disabled={selectedAnswer === null}>
                Next Question
              </button>
            ) : (
              <button onClick={handleSubmitClick} disabled={selectedAnswer === null}>
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
