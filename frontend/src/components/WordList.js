// frontend/src/components/WordList.js
import React, { useEffect, useState } from 'react';
import { getWords } from '../services/firebase';

const WordList = () => {
  const [words, setWords] = useState([]); // State to store the list of words
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch words from Firestore when the component mounts
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const wordsData = await getWords(); // Call the Firebase utility function
        setWords(wordsData); // Update state with fetched words
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchWords();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Display loading state
  if (loading) {
    return <p>Loading words...</p>;
  }

  // Display error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Render the list of words
  return (
    <div>
      <h2>Word List</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>
            <strong>{word.word}</strong>: {word.definition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordList;