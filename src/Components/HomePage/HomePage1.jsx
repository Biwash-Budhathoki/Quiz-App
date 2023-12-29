import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [difficultySelectedOption, setDifficultySelectedOption] = useState(null);
    const [categorySelectedOption, setCategorySelectedOption] = useState(null);
    const difficultyOptions = ['any', 'hard', 'easy', 'medium'];
    const categoryOptions = ['any', 'General Knowledge', 'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals & Theatres', 'Entertainment: Television', 'Entertainment: Video Games', 'Entertainment: Board Games', 'Science & Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics', 'Science: Gadgets', 'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoon & Animations'];

    const handleDifficultySelect = (option) => {
        setDifficultySelectedOption(option);
    };

    const handleCategorySelect = (option) => {
        setCategorySelectedOption(option);
    };

    return (
        <div>
            <h2>Difficulty Level</h2>
            <div className="dropdown">
                <button className="dropbtn">{difficultySelectedOption || 'Select an option'}</button>
                <div className="dropdown-content">
                    {difficultyOptions.map((option, index) => (
                        <div key={index} onClick={() => handleDifficultySelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            </div>

            <h2>Select Category</h2>
            <div className="dropdown">
                <button className="dropbtn">{categorySelectedOption || 'Select an option'}</button>
                <div className="dropdown-content">
                    {categoryOptions.map((option, index) => (
                        <div key={index} onClick={() => handleCategorySelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
