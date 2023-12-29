import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&category=9');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.results) {
      const currentQuestion = data.results[currentQuestionIndex];
      const allOptions = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      shuffleArray(allOptions);
      setOptions(allOptions);
      setCorrectAnswer(currentQuestion.correct_answer);
    }
  }, [data, currentQuestionIndex]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const checkAnswer = (e, ans) => {
    if (!lock) {
      if (ans === correctAnswer) {
        // Selected answer is correct
        e.target.classList.add('correct');
        setScore((prevScore) => prevScore + 1);
      } else {
        // Selected answer is wrong
        e.target.classList.add('wrong');

        // Find the element with the correct answer and add the "correct" class
        const options = document.querySelectorAll('ul li');
        options.forEach((option) => {
          if (option.innerText === correctAnswer) {
            option.classList.add('correct');
          }
        });
      }

      setLock(true);
    }
  };

  const handleNextQuestion = () => {
    if (lock === true) {
      // Remove styling from all list items
      const options = document.querySelectorAll('ul li');
      options.forEach((option) => {
        option.classList.remove('correct', 'wrong');
      });

      if (currentQuestionIndex < (data?.results?.length || 0) - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // Quiz completed, handle it as needed
        setResult(true);
      }

      // Reset state for the next question
      setLock(false);
      setCorrectAnswer(null);
      setOptions([]);
    }
  };

  const handleReset = () => {
    // Reset all state variables to their initial values
    setData(null);
    setLoading(false);
    setCurrentQuestionIndex(0);
    setLock(false);
    setOptions([]);
    setCorrectAnswer(null);
    setScore(0);
    setResult(false);

    // Fetch new data to start the quiz again
    fetchData();
  };

  return (
    <div className='container'>
      <h1>Trivia Quiz App</h1>
      <hr />

      {result ? (
        <div>
          <h3>Quiz Completed</h3>
          <p>Your Score: {score}</p>
          <button onClick={handleReset}>Reset Quiz</button>
        </div>
      ) : (
        <div>
          <h2
            dangerouslySetInnerHTML={{
              __html: `${currentQuestionIndex + 1}. ${data?.results?.[currentQuestionIndex]?.question}`,
            }}
          />
          <ul>
            {options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                onClick={(e) => checkAnswer(e, option)}
                dangerouslySetInnerHTML={{ __html: option }}
              />
            ))}
          </ul>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  );
};

export default Quiz1;
