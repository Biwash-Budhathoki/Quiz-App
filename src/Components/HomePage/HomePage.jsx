import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [difficultySelectedOption, setDifficultySelectedOption] = useState(null);
  const [categorySelectedOption, setCategorySelectedOption] = useState(null);
  const [typeSelectedOption, setTypeSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

    const navigate = useNavigate();

  const difficultyOptions = [
    { value: '', label: 'Any' },
    { value: 'hard', label: 'Hard' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
  ];

  const typeOptions = [
    { value: '', label: 'Any' },
    { value: 'multiple', label: 'Multiple Choice' },
    { value: 'boolean', label: 'True / False' },
  ];

  const categoryOptions = [
    { value: '', label: 'Any' },
    { value: '9', label: 'General Knowledge' },
    { value: '10', label: 'Entertainment: Books' },
    { value: '11', label: 'Entertainment: Film' },
    { value: '12', label: 'Entertainment: Music' },
    { value: '13', label: 'Entertainment: Musicals & Theatres' },
    { value: '14', label: 'Entertainment: Television' },
    { value: '15', label: 'Entertainment: Video Games' },
    { value: '16', label: 'Entertainment: Board Games' },
    { value: '17', label: 'Science & Nature' },
    { value: '18', label: 'Science: Computers' },
    { value: '19', label: 'Science: Mathematics' },
    { value: '20', label: 'Mythology' },
    { value: '21', label: 'Sports' },
    { value: '22', label: 'Geography' },
    { value: '23', label: 'History' },
    { value: '24', label: 'Politics' },
    { value: '25', label: 'Art' },
    { value: '26', label: 'Celebrities' },
    { value: '27', label: 'Animals' },
    { value: '28', label: 'Vehicles' },
    { value: '29', label: 'Entertainment: Comics' },
    { value: '30', label: 'Science: Gadgets' },
    { value: '31', label: 'Entertainment: Japanese Anime & Manga' },
    { value: '32', label: 'Entertainment: Cartoon & Animations' },
    // Add other category options in a similar format
];

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (/^[1-9][0-9]?$/.test(value) || value === '') {
      setInputValue(value);
      setError('');
    } else {
      setError('Please enter a number between 1 and 99');
    }
  };

  const handleDifficultySelect = (selectedOption) => {
    setDifficultySelectedOption(selectedOption);
  };

  const handleTypeSelect = (selectedOption) => {
    setTypeSelectedOption(selectedOption);
  };

  const handleCategorySelect = (selectedOption) => {
    setCategorySelectedOption(selectedOption);
  };

//   const handleGenerateQuiz = () => {
//     history.push({
//       pathname: '/quiz1',
//       state: {
//         difficulty: difficultySelectedOption,
//         category: categorySelectedOption,
//         type: typeSelectedOption,
//         numberOfQuestions: inputValue,
//       },
//     });
//   

    const handleGenerateQuiz = () => {
    navigate('/quiz1', {
      state: {
        quizDifficulty: difficultySelectedOption,
        quizCategory: categorySelectedOption,
        quizType: typeSelectedOption,
        questionCount: inputValue,
      },
    });
    };

  return (
    <div>
      <div>
        <h2>Number of Questions:</h2>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      <h2>Difficulty Level</h2>
      <Select
        value={difficultySelectedOption}
        onChange={handleDifficultySelect}
        options={difficultyOptions}
      />

      <h2>Select Category</h2>
      <Select
        value={categorySelectedOption}
        onChange={handleCategorySelect}
        options={categoryOptions}
      />
      <h2>Select Type</h2>
      <Select
        value={typeSelectedOption}
        onChange={handleTypeSelect}
        options={typeOptions}
      />

      <button onClick={handleGenerateQuiz}>Generate Quiz</button>
    </div>
  );
};

export default HomePage;
