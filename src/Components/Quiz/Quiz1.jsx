import React, { useState, useEffect } from 'react';

const Quiz1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=9');
        const result = await response.json();
        console.log(result);
        console.log("Type of a question is :" + result.results[index + 1].type);
        console.log("Question is:" + result.results[index + 1].question);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [index]); // Include index as a dependency if you use it in useEffect

  // Check if data is null before attempting to map over it
  if (data === null) {
    return <div>Loading...</div>;
  }

  // Check if data.results is an array before attempting to map over it
  if (!Array.isArray(data.results)) {
    return <div>Error: Invalid data format</div>;
  }

  return (
    <div>
      <h1>Data from API</h1>
      {/* Render the data in your JSX */}
      <ul>
        {data.results.map((item) => (
          <li key={item.question}>{item.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz1;
