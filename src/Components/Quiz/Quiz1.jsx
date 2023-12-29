import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const QuizComponent = () => {
  const location = useLocation();
  const { quizDifficulty, quizCategory, quizType, questionCount } = location.state || {};

  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const fetchQuizData = async () => {
    try {
      setIsLoading(true);
      const amountParam = questionCount ? questionCount : 5;
      const categoryParam = quizCategory ? `&category=${quizCategory.value}` : '';
      const difficultyParam = quizDifficulty ? `&difficulty=${quizDifficulty.value}` : '';
      const typeParam = quizType ? `&type=${quizType.value}` : '';

      const apiUrl = `https://opentdb.com/api.php?amount=${amountParam}${categoryParam}${difficultyParam}${typeParam}`;
      const response = await fetch(apiUrl);
      const result = await response.json();
      setQuizData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [quizDifficulty, quizCategory, quizType, questionCount]);

  useEffect(() => {
    if (quizData && quizData.results) {
      const currentQuestion = quizData.results[currentQuestionIdx];
      const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      randomizeArray(allOptions);
      setAnswerOptions(allOptions);
      setCorrectAnswer(currentQuestion.correct_answer);
    }
  }, [quizData, currentQuestionIdx]);

  const randomizeArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const validateAnswer = (e, selectedAnswer) => {
    if (!isAnswerLocked) {
      if (selectedAnswer === correctAnswer) {
        e.target.classList.add('correct');
        setQuizScore((prevScore) => prevScore + 1);
      } else {
        e.target.classList.add('wrong');
        const optionElements = document.querySelectorAll('ul li');
        optionElements.forEach((option) => {
          if (option.innerText === correctAnswer) {
            option.classList.add('correct');
          }
        });
      }
      setIsAnswerLocked(true);
    }
  };

  const proceedToNextQuestion = () => {
    if (isAnswerLocked) {
      const optionElements = document.querySelectorAll('ul li');
      optionElements.forEach((option) => {
        option.classList.remove('correct', 'wrong');
      });

      if (currentQuestionIdx < (quizData?.results?.length || 0) - 1) {
        setCurrentQuestionIdx((prevIndex) => prevIndex + 1);
      } else {
        setIsQuizCompleted(true);
      }

      setIsAnswerLocked(false);
      setCorrectAnswer(null);
      setAnswerOptions([]);
    }
  };

  const resetQuiz = () => {
    setQuizData(null);
    setIsLoading(false);
    setCurrentQuestionIdx(0);
    setIsAnswerLocked(false);
    setAnswerOptions([]);
    setCorrectAnswer(null);
    setQuizScore(0);
    setIsQuizCompleted(false);
    fetchQuizData();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='container'>
      <h1>Trivia Quiz App</h1>
      <hr />

      {isQuizCompleted ? (
        <div>
          <h3>Quiz Completed</h3>
          <p>Your Score: {quizScore}</p>
          <button onClick={resetQuiz}>Reset Quiz</button>
        </div>
      ) : (
        <div>
          <h2
            dangerouslySetInnerHTML={{
              __html: `${currentQuestionIdx + 1}. ${quizData?.results?.[currentQuestionIdx]?.question}`,
            }}
          />
          <ul>
            {answerOptions.map((option, optionIndex) => (
              <li
                key={optionIndex}
                onClick={(e) => validateAnswer(e, option)}
                dangerouslySetInnerHTML={{ __html: option }}
              />
            ))}
          </ul>
          <button onClick={proceedToNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;